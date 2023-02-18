<?php

namespace App\Entity;

use App\Repository\BuyerRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BuyerRepository::class)]
class Buyer extends User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    public function getId(): ?int
    {
        return $this->id;
    }
    public function getRoles(): array
    {
        $roles = $this->roles();
        $roles[] = 'ROLE_BUYER';
        return $this->roles;
    }
}
