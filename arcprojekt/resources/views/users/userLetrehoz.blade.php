<!-- resources/views/csapatok/create.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>Új User Hozzáadása</title>
</head>
<body>
    <h1>Új User Hozzáadása</h1>

    @if (isset($message))
        <p>{{ $message }}</p>
    @endif

    <form method="POST" action="/api/userLetrehoz">
        @csrf

        <label for="name">Név:</label>
        <input type="text" name="name" required>
        <br>

        <label for="email">Email:</label>
        <input type="text" name="email" required>
        <br>

        <label for="password">Password:</label>
        <input type="text" name="password" required>
        <br>

        <br>

        <button type="submit">Mentés</button>
    </form>
</body>
</html>
