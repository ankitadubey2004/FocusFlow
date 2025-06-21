function handleSignup(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const signupData = { name, email, password };

  fetch('http://localhost:5000/api/auth/signup', {  // make sure URL matches your backend
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signupData)
  })
  .then(res => res.json())
  .then(data => {
    if(data.token) {
      alert("Signup successful!");
      localStorage.setItem('token', data.token);
      window.location.href = 'login.html';  // Redirect after signup
    } else {
      alert(data.message || 'Signup failed');
    }
  })
  .catch(err => {
    console.error('Error:', err);
    alert('Signup error. Check console for details.');
  });
}
