<?php
require_once __DIR__ . '/../dao/ServicesDao.class.php';

class ServicesService
{
    private $services_dao;
    public function __construct()
    {
        $this->services_dao = new ServicesDao();
    }

    public function get_services()
    {
        return $this->services_dao->get_services();
    }
}