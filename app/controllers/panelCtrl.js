angular.module(module).controller('panelCtrl', function ($location, $rootScope, $scope, genericAPI) {
    if (!$rootScope.usuario) $location.path('/login');

    var contacts = [
        {
            number: 92991905809,
            name: 'Adelson'
        },
        {
            number: 92981440856,
            name: 'Nilton'
        },
        {
            number: 92999071077,
            name: 'Raquel'
        },
        {
            number: 92991764093,
            name: 'Dayane'
        }
    ]

    var change = function (e) {
        var file = e.path[0].files[0];

        var reader = new FileReader();

        reader.onloadend = function (fileLoaded) {
            // preview.src = reader.result;
            // console.log(reader.result);
            console.log(fileLoaded.target.result);
        }

        if (file) {
            reader.readAsDataURL(file, "UTF-8");
        } else {
            preview.src = "";
        }
    }

    $scope.setText = function () {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt';
        input.click();
        input.addEventListener('change', change);
    }
});