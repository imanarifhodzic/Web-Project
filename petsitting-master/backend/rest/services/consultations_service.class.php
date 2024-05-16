<?php
require_once __DIR__ . '/../dao/ConsultationsDao.class.php';

class ConsultationsService
{
    private $consultations_dao;
    public function __construct()
    {
        $this->consultations_dao = new ConsultationsDao();
    }

    public function add_consultations($payload)
    {
        return $this->consultations_dao->add_consultations($payload);
    }
}