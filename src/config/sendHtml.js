export const htmlData = (activatedLink) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Activation Link</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

    body {
      font-family: 'Poppins', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
    h4 {
      color: #333333;
      font-size: 20px;
      margin-bottom: 20px;
      text-align: center;
    }
    .btn {
      display: inline-block;
      color: white;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
      padding: 10px 30px;
      border-radius: 50px;
      text-align: center;
      margin: 20px auto;
      display: block;
      width: fit-content;
      border: 2px solid #007bff;
    }
    .btn:hover {
      border-color: #0056b3; /* Slightly darker blue */
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h4>Click the button below to activate your account</h4>
    <a href="${activatedLink}" class="btn">Activate Now</a>
  </div>
</body>
</html>
`
} 