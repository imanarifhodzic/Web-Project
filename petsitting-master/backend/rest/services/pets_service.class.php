<?php
require_once __DIR__ . '/../dao/PetsDao.class.php';

class PetsService
{
    private $pets_dao;
    public function __construct()
    {
        $this->pets_dao = new PetsDao();
    }

    public function get_pets()
    {
        return $this->pets_dao->get_pets();
    }
}