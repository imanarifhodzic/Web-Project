<?php
require_once __DIR__ . '/../dao/FeedbackDao.class.php';

class FeedbackService
{
    private $feedback_dao;
    public function __construct()
    {
        $this->feedback_dao = new FeedbackDao();
    }

    public function get_feedback()
    {
        return $this->feedback_dao->get_feedback();
    }
}