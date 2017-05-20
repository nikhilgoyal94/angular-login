/**
 * Created by goyalnik on 5/13/2017.
 */
angular.module("common.directives.login", [

])

    .directive("login", [
        function(){
            var directive = {
                restrict: "AE",
                templateUrl: "directives/login/login.tpl.html",
                scope: {
                    userId: '=userid',
                    userPassword: "=userpassword",
                    onLogin: "=onlogin",
                    validator: "=?validator",
                    idErrorMessage: "=?iderrormessages",
                    passwordErrorMessage: "=?passworderrormessages"
                },
                link: function($scope, element, attr){

                    var maxAttempt = 0;
                    var numberOfAttempt = 0;
                    var DEFAULT_MAX_ATTEMPT_MESSAGE = "Login is disabled. Please try after a while.";

                    $scope.isFormVisible = false;
                    $scope.disableLogin = false;
                    $scope.maxAttemptMessage = DEFAULT_MAX_ATTEMPT_MESSAGE;
                    $scope.isPasswordShowing = false;

                    /**
                     * it will take the attribute name and check if that attribute is passed from the user directive or
                     * not.
                     *
                     * @param attrName
                     * @returns {boolean}
                     *
                     * Return values
                     * =============
                     * true: if the value is passed by the user.
                     * false: if the value is not passed by the user.
                     *
                     */
                    var isAttrPresent = function(attrName){
                        if(attr[attrName]){
                            return true;
                        }
                        else {
                            if(attr[attrName] === false){
                                return true;
                            }

                            return false;
                        }
                    };

                    /**
                     * it will check if the attribute name is present or not. In case, it is present, it will return the
                     * value of the attribute. Otherwise, it will return the default value of the attribute. In case if
                     * the default value is also not passed to this function, it will return false.
                     *
                     * @param attrName
                     * @param defaultValue
                     * @returns {boolean}
                     *
                     * Return Values
                     * =============
                     * true: if the attribute is present and has the value true or the attribute is not present and the
                     *       default value is true.
                     * false: in all other cases.
                     *
                     */
                    var ensurePresenceOfBoolean = function(attrName, defaultValue){
                        if(!defaultValue){
                            defaultValue = false;
                        }

                        if(isAttrPresent(attrName)){
                            switch(attr[attrName]){
                                case true:
                                case "true":
                                    return true;
                                case false:
                                case "false":
                                    return false;
                                default:
                                    return defaultValue;
                            }
                        }

                        return defaultValue;
                    };

                    /**
                     * it will check if the attribute name is present or not. if it is not present, it will return the
                     * default value provided. if it is present, then it will check if the value provided is number or
                     * not. If it is not a number, again the default value is returned. Otherwise, the number that is
                     * present is returned.
                     *
                     * @param attrName
                     * @param defaultValue
                     */
                    var ensurePresenceOfNumber = function(attrName, defaultValue){
                        if(!defaultValue){
                            defaultValue = 0;
                        }

                        if(isAttrPresent(attrName)){
                            if(isNaN(attr[attrName])){
                                return defaultValue;
                            }

                            return attr[attrName];
                        }

                        return defaultValue;
                    };

                    /**
                     * it will check if the attribute name is present or not. if it is not, it will return the default
                     * value, otherwise, it will return the passed string. if the default value is not present, then it
                     * will initialize it to empty string.
                     *
                     * @param attrName
                     * @param defaultValue
                     * @returns {string}
                     */
                    var ensurePresenceOfString = function(attrName, defaultValue){
                        if(!defaultValue){
                            defaultValue = "";
                        }

                        if(isAttrPresent(attrName)){
                            if(attr[attrName]){
                                return attr[attrName];
                            }
                        }

                        return defaultValue;
                    };

                    /**
                     * this function will check if the null values for the fields needs to be checked or not. If not,
                     * then it will return true. If yes, then it will check if any field is null or empty, it will
                     * return false, otherwise, it will return true.
                     *
                     * @returns {boolean}
                     *
                     * Return Values
                     * =============
                     * true: if null value need not to be checked, or, it needs to be checked and none of the fields is
                     *       null or empty.
                     * false: if null value needs to be checked and any one of the field is null or empty.
                     *
                     */
                    var nullChecksDuringLogin = function(){
                        var nullChecks = ensurePresenceOfBoolean("nullchecks", false);

                        if(nullChecks){
                            if(!$scope.userId){
                                showComment("ID not valid.");
                                return false;
                            }

                            if(!$scope.userPassword){
                                showComment("Password not valid.");
                                return false;
                            }

                            $scope.userId = $scope.userId.trim();
                            $scope.userPassword = $scope.userPassword.trim();

                            if($scope.userId === ""){
                                showComment("ID not valid.");
                                return false;
                            }

                            if($scope.userPassword === ""){
                                showComment("Password not valid.");
                                return false;
                            }
                        }

                        return true;
                    };

                    /**
                     * it will check if the comments needs to be shown or not and if yes, will show the comments.
                     *
                     * @param commentText
                     */
                    var showComment = function(commentText){
                        var comments = ensurePresenceOfBoolean("comments", false);

                        if(comments){
                            console.log(commentText);
                        }
                    };

                    /**
                     * it will check if the validator attribute is provided by user or not. If not, it will return true
                     * so as to facilitate the further login process. If it is present, it will check if it is a function
                     * or not. If it is a function, then it will check for the return value of the function. The return
                     * value can either be true or non true. In case of non true, it will return false, otherwise it
                     * will return true. If it is not a function, then it will check if variable given by it is a
                     * boolean or not. If it is not, it will return false, otherwise, it will return that particular
                     * boolean value.
                     *
                     * @returns {boolean}
                     */
                    var performValidation = function(){
                        var isValidatorFunctionPresent = isAttrPresent("validator");
                        var isValid;

                        if(isValidatorFunctionPresent){
                            if(angular.isFunction($scope.validator)){
                                isValid = $scope.validator();

                                if(isValid !== true){
                                    showComment("Value from validator function: " + isValid);
                                    return false;
                                }

                                return true;
                            }

                            showComment("validator is not a function. Checking for boolean type.");

                            if($scope.validator === false || $scope.validator === true){
                                return $scope.validator;
                            }

                            showComment("validator is not a boolean type.");
                            return false;
                        }

                        showComment("No validator function passed. Directly proceeding to login.");
                        return true;
                    };

                    /**
                     * It will check if all the required arguments are present or not. If not, the form will not show.
                     * Otherwise, the form will show.
                     */
                    var shouldShowForm = function(){
                        $scope.isFormVisible =  isAttrPresent("userid") && !angular.isFunction($scope.userId) &&
                                                isAttrPresent("userpassword") && !angular.isFunction($scope.userPassword) &&
                                                isAttrPresent("onlogin") && angular.isFunction($scope.onLogin);
                    };

                    /**
                     * this function will ensure that error message for id is available and if it is not, it will assign
                     * an empty array to it.
                     */
                    var createIdErrorVariable = function(){
                        var temp = [];

                        if(isAttrPresent("iderrormessages")){

                            if(angular.isString($scope.idErrorMessage)){

                            }
                            else if(Array.isArray($scope.idErrorMessage)){
                                temp = $scope.idErrorMessage;
                            }
                            else{
                                $scope.idErrorMessage = [];
                            }
                        }
                        else{
                            $scope.idErrorMessage = [];
                        }

                        $scope.idErrorMessage = null;
                        $scope.idErrorMessage = temp;
                    };

                    /**
                     * this function will ensure that error message for password is available and if it is not, it will assign
                     * an empty array to it.
                     */
                    var createPasswordErrorVariable = function(){
                        var temp = [];

                        if(isAttrPresent("passworderrormessages")){

                            if(Array.isArray($scope.passwordErrorMessage)){
                                temp = $scope.passwordErrorMessage;
                            }
                            else{
                                $scope.passwordErrorMessage = [];
                            }
                        }
                        else{
                            $scope.passwordErrorMessage = [];
                        }

                        $scope.passwordErrorMessage = null;
                        $scope.passwordErrorMessage = temp;
                    };

                    /**
                     * this function will be called in case user presses login button. it will do all the required
                     * validations. Once those validations are successful, it will check if the function is passed from
                     * the user or not. If it is not, it will not do anything, otherwise perform the function passed.
                     */
                    $scope.onLoginClick = function(){
                        if($scope.disableLogin){
                            return;
                        }

                        var isValid = nullChecksDuringLogin() && performValidation();

                        if(isValid){
                            var isLoginFunctionPresent = isAttrPresent("onlogin");

                            if(isLoginFunctionPresent){

                                if(angular.isFunction($scope.onLogin)){
                                    $scope.onLogin();

                                    createIdErrorVariable();
                                    createPasswordErrorVariable();

                                    numberOfAttempt++;

                                    maxAttempt = ensurePresenceOfNumber("maxattempt", 0);

                                    maxAttempt = parseInt(maxAttempt);

                                    if(maxAttempt === numberOfAttempt){
                                        $scope.maxAttemptMessage = ensurePresenceOfString("maxattemptmessage", DEFAULT_MAX_ATTEMPT_MESSAGE);
                                        $scope.disableLogin = true;
                                    }
                                }
                                else{
                                    showComment("onlogin is not a function.");
                                }
                            }
                            else{
                                showComment("No login function passed.");
                            }
                        }
                        else{
                            showComment("Form not valid.");
                        }
                    };

                    /**
                     * This function will act as a constructor for this directive.
                     */
                    var onRegister = function(){
                        $scope.showOrHidePassword = ensurePresenceOfBoolean("showorhidepassword", false);
                        shouldShowForm();
                    };

                    onRegister();
                }
            };

            return directive;
        }
    ]);