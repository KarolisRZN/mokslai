async function displayUserName(userId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/%7BuserId%7D`
    );
    if (!response.ok) {
      throw new Error("User not found");
    }
    const userData = await response.json();
    document.getElementById(
      "user-info"
    ).textContent = `User Name: ${userData.name}`;
  } catch (error) {
    document.getElementById(
      "user-info"
    ).textContent = `Error: ${error.message}`;
  }
}
displayUserName(1);
