///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\\///\\\///\\\///\\\///\\\\
/// 	Program:	user prompt/welcome  javascript																				                                       \\\
///		Summary:	           \\\
/// 						                                                																		                         \\\
/// 	Methods:                                                                                                               \\\
/// 																								                                                                         \\\
/// Date          Version        Coder           Reason												                                               \\\
/// 2021-02-12    1              Heidi           Created Framwork										                                         \\\
/// 0000-00-00    1.1            Heidi                                                                                       \\\
///																									                                                                         \\\
///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\\///\\\///\\\///\\\///\\\\
///It will contain one form. That asks for the name of the user. When a button is pushed.
function userprompt(){
  var person = prompt("Greetings! How would you like to be addressed?", "Jack Dangermond");
  if (person != null){
    document.getElementById("welcomename").innerHTML =
    "Hello " + person;
    }
  }
