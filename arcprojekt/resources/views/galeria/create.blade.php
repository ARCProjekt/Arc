<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galéria létrehozása</title>
</head>
<body>

<form action="{{ route('galeria.store') }}" method="post" enctype="multipart/form-data">
    @csrf

    <label for="galeria_leiras_magyar">Galéria leírása (Magyar):</label>
    <input type="text" name="galeria_leiras[magyar]" id="galeria_leiras_magyar" required>
    <br>

    <label for="galeria_leiras_angol">Galéria leírása (Angol):</label>
    <input type="text" name="galeria_leiras[angol]" id="galeria_leiras_angol" required>
    <br>

    <label for="kep_leiras_magyar">Kép leírása (Magyar):</label>
    <input type="text" name="kep_leiras[magyar]" id="kep_leiras_magyar" required>
    <br>

    <label for="kep_leiras_angol">Kép leírása (Angol):</label>
    <input type="text" name="kep_leiras[angol]" id="kep_leiras_angol" required>
    <br>

    <label for="kepek">Képek:</label>
    <input type="file" name="kepek[]" id="kepek" multiple required>
    <button type="button" onclick="addInput()">További kép kiválasztása</button>
    <br>

    <label for="fotos_neve">Fotós neve:</label>
    <input type="text" name="fotos_neve" id="fotos_neve" required>
    <br>

    <button type="submit">Galéria létrehozása</button>
</form>

<script>
function addInput() {
    const input = document.createElement('input');
    input.type = 'file';
    input.name = 'kepek[]';
    input.multiple = true;
    
    const br = document.createElement('br');
    
    document.getElementById('kepek').before(input, br);
}
</script>

</body>
</html>
