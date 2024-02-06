<!-- resources/views/csapatok/create.blade.php -->

<!DOCTYPE html>
<html>

<head>
    <title>Új Alkotó Hozzáadása</title>
</head>

<body>
    <h1>Új Alkotó Hozzáadása</h1>

    @if (isset($message))
    <p>{{ $message }}</p>
    @endif

    <form method="POST" action="/api/alkotok">
        @csrf

        <label for="galeria_id">Szak ID:</label>
        <input type="text" name="szak_id" required>
        <br>

        <label for="magyar_nev">Magyar Név:</label>
        <input type="text" name="magyar_nev" required>
        <br>

        <label for="angol_nev">Angol Név:</label>
        <input type="text" name="angol_nev" required>
        <br>

        <label for="magyar_leiras">Magyar Bemutatkozás:</label>
        <textarea name="magyar_bemutat" required></textarea>
        <br>

        <label for="angol_leiras">Angol Bemutatkozás:</label>
        <textarea name="angol_bemutat" required></textarea>
        <br>

        <label for="alkotok">Válassz Képet:</label>
        <select name="kepek[]" multiple>
            @foreach($kepek as $kep)
            <option value="{{ $kep->kep_azon }}">{{ $kep->kep }}</option>
            @endforeach
        </select>
        <br>

        <button type="submit">Mentés</button>
    </form>
</body>

</html>