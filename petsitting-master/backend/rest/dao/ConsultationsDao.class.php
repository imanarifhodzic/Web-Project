<?php

require_once __DIR__ . '/BaseDao.class.php';

class ConsultationsDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('consultations');
    }

    public function add_consultations($payload)
    {
        return $this->insert("consultations", $payload);
    }
}