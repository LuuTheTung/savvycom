function validateForm() {
  //   validate name
  let name = $("#name").val();
  if (name == "") {
    alert("Name must be filled out");
  }
  // validate age
  let age = $("#age").val();
  if (age == "") {
    alert("Age must be filled out");
  }
  //   validate email
  let email = $("#email").val();
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email != "") {
    if (!email.match(mailformat)) {
      alert("You have entered an invalid email address!");
    }
  } else {
    alert("Email must be filled out!");
  }

  // validate phone number
  var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  var phone = $("#phone").val();
  //   let phone = document.forms["survey-form"]["phone"].value;
  if (phone !== "") {
    if (vnf_regex.test(phone) == false) {
      alert("Invalid phone number!");
    }
  } else {
    alert("Phone must be filled out!");
  }

  var role = $("#role").val();
  var userRecommend = $(":radio:checked").val();
  var improved = $("input[type='checkbox']:checked").val();
  var comment = $("#comment").val();

  console.log(
    `Data received: ${name} , ${email}, ${age}, ${phone}, ${role} , ${userRecommend},${improved}, ${comment}`
  );
}
