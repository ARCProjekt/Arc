<!-- resources/views/csapatok/create.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>Új Csapat Hozzáadása</title>
</head>
<body>
    <h1>Új Csapat Hozzáadása</h1>

    @if (isset($message))
        <p>{{ $message }}</p>
    @endif

    <form method="POST" action="/api/csapatok">
        @csrf

        <label for="galeria_id">Galéria ID:</label>
        <input type="text" name="galeria_id" required>
        <br>

        <label for="projekt_id">Projekt ID:</label>
        <input type="text" name="projekt_id" required>
        <br>

        <label for="magyar_nev">Magyar Név:</label>
        <input type="text" name="magyar_nev" required>
        <br>

        <label for="angol_nev">Angol Név:</label>
        <input type="text" name="angol_nev" required>
        <br>

        <label for="magyar_leiras">Magyar Leírás:</label>
        <textarea name="magyar_leiras" required></textarea>
        <br>

        <label for="angol_leiras">Angol Leírás:</label>
        <textarea name="angol_leiras" required></textarea>
        <br>

        <label for="alkotok">Válassz Alkotókat:</label>
        <select name="alkotok[]" multiple>
            @foreach($alkotok as $alkoto)
                <option value="{{ $alkoto->a_azon }}">{{ $alkoto->nyelv_id_nev }}</option>
            @endforeach
        </select>
        <br>

        <button type="submit">Mentés</button>
    </form>
</body>
</html>
