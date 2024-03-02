<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kép létrehozása</title>
</head>
<body>

<h2>Kép létrehozása</h2>

<form action="{{ url('/api/kepek/store') }}" method="post" enctype="multipart/form-data">
    @csrf

    <div class="form-group">
        <label for="kep">Kép kiválasztása:</label>
        <input type="file" name="kep" id="kep" required>
    </div>

    <div class="form-group">
        <label for="nyelv_id_leiras_magyar">Nyelv (Leírás - Magyar):</label>
        <input type="text" name="nyelv_id_leiras[magyar]" id="nyelv_id_leiras_magyar" required>
    </div>

    <div class="form-group">
        <label for="nyelv_id_leiras_angol">Nyelv (Leírás - Angol):</label>
        <input type="text" name="nyelv_id_leiras[angol]" id="nyelv_id_leiras_angol" required>
    </div>

    <div class="form-group">
        <label for="fotos_neve">Fotós neve:</label>
        <input type="text" name="fotos_neve" id="fotos_neve" required>
    </div>

    <button type="submit" class="btn btn-primary">Kép létrehozása</button>
</form>

</body>
</html>
