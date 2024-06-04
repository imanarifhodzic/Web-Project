<?php

require_once __DIR__ . '/../dao/UserDao.class.php';

class UserService {
    private $user_dao;

    public function __construct() {
        $this->user_dao = new UserDao();
    }

    public function add_user($payload) {
        $payload['password'] = password_hash($payload['password'], PASSWORD_BCRYPT);
        return $this->user_dao->add_user($payload);
    }

    public function get_user_by_id($user_id) {
        return $this->user_dao->get_user_by_id($user_id);
    }

    public function update($user_id, $user) {
        $this->user_dao->update_user($user_id, $user);
    }

    public function get_users() {
        return $this->user_dao->get_users();
    }

    public function get_user_by_email($email) {
        return $this->user_dao->get_user_by_email($email);
    }
}