<?php

namespace App\GraphQL\Resolvers;

use App\Models\LearnerProfile;
use App\Models\User;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Illuminate\Support\Facades\Auth;


class UpdateLearnerProfileResolver
{
    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return LearnerProfile
     * @throws \Exception
     */
    public function resolve($rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
        /** @var User $user */
        $user = Auth::user();
        $user->update([
            'email' => $args['email'],
            'name' => $args['name']
        ]);

        $old_password = $args['old_password'] ?? null;
        if ($old_password) {
            $user->update([
                'password' => bcrypt($args['old_password']),
            ]);
        }
        $picture_url = $args['picture_url'] ?? null;


        /** @var LearnerProfile $learnerProfile */
        $learnerProfile = $user->learnerProfile()->findOrFail($args['id']);
        $learnerProfile->update([
            'role' => $args['role'] ?? '',
            'tenure' => $args['tenure'] ?? ''
        ]);

        if ($picture_url) {
            $tempFileName = Str::random(40);
            $extension = explode('/', mime_content_type($picture_url))[1];
            $filePath = sys_get_temp_dir() . '/' . $tempFileName . "." . $extension;

            $picture_url = preg_replace('/data:image\/(.*?);base64,/', '', $picture_url);
            $picture_url = str_replace(' ', '+', $picture_url);

            file_put_contents($filePath, base64_decode($picture_url));

            $picture_url = $this->storeToTempFolderFromPath($filePath, $tempFileName . "." . $extension);
            $learnerProfile->update([
                'picture_url' => $picture_url,
            ]);
        }

        return $learnerProfile->load(['programInvites', 'programs']);
    }


    /**
     * @param resource|string $fileSource
     * @param $fileName
     * @return string
     * @throws \Exception
     */
    public function storeToTempFolderFromPath($fileSource, $fileName)
    {
        $fs = is_resource($fileSource) ? $fileSource : @fopen($fileSource, 'rb');
        if (!$fs) throw new \Exception('Unable to open file');
        if (!rewind($fs)) {
            throw new \Exception('Unable to set pointer');
        }
        if (!Storage::disk(config('filesystems.cloud'))->put('avatars/' . $fileName, $fs)) {
            throw new \Exception('Unable to store avatar');
        };

        return 'avatars/' . $fileName;
    }
}