# File Structure #
Angular Login  
&nbsp;&nbsp;&nbsp;&nbsp;|  
&nbsp;&nbsp;&nbsp;&nbsp;|-- directives/  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- login/  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- login.js  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- login.tpl.html  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- login.css  

# Directive - Login #
Files for the directive are placed in the folder **directives/login**. These files should be present in the folder
structure of the project. If you have some other place where you have all your directives, you can simply copy only the
**login/**folder present in the **directives/** folder or otherwise, you can have this in the same folder
 structure as it is now. If you change the folder to some other folder, you need to change the path in the **directives/login/login.js** 
 accordingly.

# How to use #
This project itself contains a sample application for the use of this login module.
1. Just include **login.js** and **login.less** in the html file.
2. In the controller of the application page, inject module **common.directives.login** as done in the file **app.js**.
3. Simply use **<login>** as you use any other DOM Element.

# Parameters #
Here is the list of parameters which can be passed to the element.

1. **userid**: Required. The value of the field which is linked to id field of the login form.
2. **userpassword**: Required. The value of the field which is linked to password field of the login form.
3. **onlogin**: Required. This will be a function which will be called on click of login after the validations has been done
with another parameter.
4. **validator**: Optional. This can be a function which returns boolean or can be directly a value which is boolean.
If there is any other value than the boolean, it will consider it as false and proceed. If it is provided, it will check
if this variable and based on that, if it is true, it will proceed to **onlogin** function, otherwise will stop there
only.  If it is not provided, it will directly continue to the **onlogin** function.
5. **comments**: Optional. This can take value as boolean. If true, it will show the comments from the directive which
are there already. Otherwise, it wont show the comments. In case of modifying the directive and adding comments, just
call the function **showComment()** with argument as the text which you want to show to keep the same functionality.
By default, this is set as true.  
6. **nullchecks**: Optional. If this attribute is set to true, it will perform the null checks on both fields in the 
form and then pass the control to **validator** function if present.
7. **maxattempt**: Optional. If the attribute is not present, it will call the login function infinite times as the user clicks on the button.
Otherwise, it will keep a record of the number of times the login has failed and check it with maximum number of attempts. After it reaches the
maximum number of attempts, it will hide the login button with a message.  
8. **iderrormessage**: Optional. It must be array if it is present. If present, it will map that variable to the error messages corresponding to id. 
Any change in that variable will be reflected in the error message for the id.
9. **passworderrormessage**: Optional. It must be array if it is present. If present, it will map that variable to the error messages corresponding to password. 
Any change in that variable will be reflected in the error message for the password.  
10. **showorhidepassword**: Optional. If not present, password will be hidden always. If present, it will check if the switch is turned on or not. If 
the switch is on, the password will be shown. Otherwise, it will not show. This will accept only boolean value. So if any other value than true or
false is sent as the value of the attribute, it will be considered as not present.

# Further Improvements #
1. **iderrormessage** and **passworderrormessage** in **attributes** must be Array. Support for string also will be given.  


# Issues #
Feel free to report any issues if you find.  
  
Enjoy with this simple directive. :-)
