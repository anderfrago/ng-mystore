<?php

namespace App\Security;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class CustomAuthenticator extends AbstractController
{
    #[Route('/api/register', name: 'register', methods: "post")]
    public function register(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher)
    {
        $em = $doctrine->getManager();
        // IMP! To get JSON format from POST method
        $data = $request->getContent();
        $content = json_decode($data);

        $username = $content->username;
        $plaintextPassword = $content->password;

        $user = new User($username);
        // hash the password (based on the security.yaml config for the $user class)
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setUsername($username);
        $user->setPassword($hashedPassword);
        $user->setIsActive(true);


        $em->persist($user);
        $em->flush();

        return new JsonResponse([
            'message' => 'User %s successfully created',
            'username' => $user->getUsername()
        ]);
    }

}