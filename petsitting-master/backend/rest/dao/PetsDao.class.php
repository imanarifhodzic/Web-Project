<?php

require_once __DIR__ . '/BaseDao.class.php';

class PetsDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('pets');
    }

    public function get_pets()
    {
        return $this->query("SELECT * FROM pets", []);
    }
}