<!-- resources/views/users/useruserLetrehoz.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>Felhasználó Létrehozása</title>
</head>
<body>
    <h1>Felhasználó Létrehozása</h1>

    @if (isset($message))
        <p>{{ $message }}</p>
    @endif

    <form method="POST" action="{{ route('user.store') }}">
        @csrf

        <label for="name">Név:</label>
        <input type="text" name="name" required>
        <br>

        <label for="email">Email:</label>
        <input type="text" name="email" required>
        <br>

        <label for="password">Jelszó:</label>
        <input type="password" name="password" required>
        <br>

        <label for="jog">Jogosultsági szerepkör:</label>
        <select name="jog" required>
            <option value="tanar">Tanár</option>
            <option value="admin">Admin</option>
        </select>
        <br>

        <button type="submit">Mentés</button>
    </form>

    <h2>Felhasználók listája:</h2>
    @foreach($users as $user)
        <p>{{ $user->name }} - {{ $user->email }} - {{ $user->jogosultsag->elnevezes }}</p>
    @endforeach

    @if(isset($lastCreatedUser))
        <p>Legutóbb létrehozott felhasználó: {{ $lastCreatedUser->name }} - {{ $lastCreatedUser->email }} - {{ $lastCreatedUser->jogosultsag->elnevezes }}</p>
    @endif
</body>
</html>
