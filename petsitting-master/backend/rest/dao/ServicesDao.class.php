<?php

require_once __DIR__ . '/BaseDao.class.php';

class ServicesDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('services');
    }

    public function get_services()
    {
        return $this->query("SELECT * FROM services", []);
    }
}