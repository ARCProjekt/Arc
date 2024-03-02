<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Csapat létrehozása</title>
</head>
<body>

<form action="{{ url('/api/csapat/store') }}" method="post">
    @csrf
    <label for="galeria_id">Galeria ID:</label>
    <input type="text" name="galeria_id" required>
    <br>

    <label for="k_id">Kategória ID:</label>
    <input type="text" name="k_id" required>
    <br>

    <label for="magyar_nev">Magyar Név:</label>
    <input type="text" name="magyar_nev" required>
    <br>

    <label for="angol_nev">Angol Név:</label>
    <input type="text" name="angol_nev" required>
    <br>

    <label for="magyar_leiras">Magyar Leírás:</label>
    <input type="text" name="magyar_leiras" required>
    <br>

    <label for="angol_leiras">Angol Leírás:</label>
    <input type="text" name="angol_leiras" required>
    <br>

    <!-- Képekhez kapcsolódó részek eltávolítva -->
    
    <button type="submit">Csapat létrehozása</button>
</form>

</body>
</html>
