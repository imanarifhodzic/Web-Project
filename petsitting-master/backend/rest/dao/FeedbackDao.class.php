<?php

require_once __DIR__ . '/BaseDao.class.php';

class FeedbackDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('feedback');
    }

    public function get_feedback()
    {
        return $this->query("SELECT * FROM feedback", []);
    }
}