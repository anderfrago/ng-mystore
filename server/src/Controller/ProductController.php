<?php

namespace App\Controller;

use App\Entity\Product;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class ProductController extends AbstractController
{
    #[Route('/products', name: 'product-create', methods: "post")]
    public function createProduct(ManagerRegistry $doctrine, Request $request){

        $data = $request->getContent();
        $content = json_decode($data);
        $product_stdClass = $content;

        // syfony version < v5: $em = $this->getDoctrine()->getManager();
        $em = $doctrine->getManager();

        $product = new Product();
        $product->setTitle($product_stdClass->title);
        $product->setRating($product_stdClass->rating);
        $product->setPrice($product_stdClass->price);
        $product->setShortDescription($product_stdClass->shortDescription);
        $product->setDescription($product_stdClass->description);
        $product->setCategories($product_stdClass->categories);
        $product->setImage($product_stdClass->images);

        $em->persist($product);
        $em->flush();

        $result = [
            "title" => $product->getTitle(),
            "price" => $product->getPrice(),
            "rating" => $product->getRating(),
            "description" => $product->getDescription(),
            "shortDescription" => $product->getShortDescription(),
            "images" => $product->getImage(),
            "categories" => $product->getCategories()
        ];
        return $this->json([
            $result
        ]);
    }


    #[Route('/products/{id}', name: 'product-id', methods: "get", requirements: ['id' => '\d+'])]
    public function findById(ManagerRegistry $doctrine, $id){

        $product = $doctrine->getRepository(Product::class)->find($id);

        $data = [
            "title" => $product->getTitle(),
            "price" => $product->getPrice(),
            "rating" => $product->getRating(),
            "description" => $product->getDescription(),
            "shortDescription" => $product->getShortDescription(),
            "images" => $product->getImage(),
            "categories" => $product->getCategories()
        ];

        return $this->json(
            $data
        );
    }

    #[Route('/products/{name}', name: 'product-name', methods: "get")]
    public function findByName(ManagerRegistry $doctrine, $name){

        $products = $doctrine->getRepository(Product::class)->findBy([
            "name" => $name
        ]);

        $result =  [];
        foreach ($products as $product){
            $data = [
                "title" => $product->getTitle(),
                "price" => $product->getPrice(),
                "rating" => $product->getRating(),
                "description" => $product->getDescription(),
                "shortDescription" => $product->getShortDescription(),
                "images" => $product->getImage(),
                "categories" => $product->getCategories()
            ];
            $result[] =$data;
        }

        return $this->json([
            $result
        ]);
    }


    #[Route('/products/{id}', name: 'product-update', methods: "put")]
    public function productUpdate(ManagerRegistry $doctrine, $id, Request $request){

        // syfony version < v5: $em = $this->getDoctrine()->getManager();
        $em = $doctrine->getManager();

        $data = $request->getContent();
        $content = json_decode($data);
        $product_stdClass = $content->product;

        $product = $this->getDoctrine()->getRepository(Product::class)->find($id);


        $product->setTitle($product_stdClass->title);
        $product->setPrice($product_stdClass->price);
        $product->setShortDescription($product_stdClass->shortDescription);
        $product->setDescription($product_stdClass->description);
        $product->setCategories($product_stdClass->categories);
        $product->setImage($product_stdClass->images);

        $em->flush();

        return $this->json([
            "message" => "Product update",
            $product_stdClass
        ]);
    }

    #[Route('/products/{id}', name: 'product-delete', methods: "delete")]
    public function productDelete(ManagerRegistry $doctrine, $id){

        $em = $doctrine->getManager();
        $product = $this->getDoctrine()->getRepository(Product::class)->find($id);

        $em->remove($product);
        $em->flush();

        return $this->json([
            "message" =>"Product deleted"
        ]);
    }

    #[Route('/products', name: 'app_product')]
    public function index(ManagerRegistry $doctrine): JsonResponse
    {
        $products =  $doctrine->getRepository(Product::class)->findAll();

        $data = [];

        foreach ($products as $product){
            $tmp =[
                "id" => $product->getId(),
                "title" => $product->getTitle(),
                "price" => $product->getPrice(),
                "rating" => $product->getRating(),
                "description" => $product->getDescription(),
                "shortDescription" => $product->getShortDescription(),
                "images" => $product->getImage(),
                "categories" => $product->getCategories()
            ];
            $data[] = $tmp;
        }

        return $this->json([
            'message' => 'Welcome to the jungle!',
            'products' => $data,
        ]);
    }


}
