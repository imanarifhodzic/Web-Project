var animalService = {
  reload_pets_datatable: function () {
    RestClient.get("get_pets.php", function (data) {
      console.log("Animals data loaded", data);
    });
  },
};
