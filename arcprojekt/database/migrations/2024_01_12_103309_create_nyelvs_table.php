<?php

use App\Models\Nyelv;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nyelvs', function (Blueprint $table) {
            $table->id('nyelv_id');
            $table->string('magyar');
            $table->string('angol');
            $table->string('hol');
            $table->timestamps();
        });

        Nyelv::create([
            'angol' => "Echoes of the future",
            'magyar' => "A jövő visszhangjai",
            'hol' => 'Kategória elnevezés',
        ]);

        Nyelv::create([
            'angol' => "Paths of the unknown",
            'magyar' => "Az ismeretlen ösvényei",
            'hol' => 'Kategória elnevezés',
        ]);

        Nyelv::create([
            'angol' => "Nomad legacy",
            'magyar' => "Nomád örökség",
            'hol' => 'Kategória elnevezés',
        ]);

        Nyelv::create([
            'angol' => "Urban chronicles",
            'magyar' => "Városi krónikák",
            'hol' => 'Kategória elnevezés',
        ]);
        Nyelv::create([
            'angol' => "Post-apocalyptic futurism",
            'magyar' => "Poszt-apokaliptikus futurizmus",
            'hol' => 'Kategória elnevezés',
        ]);
        Nyelv::create([
            'angol' => "Urban survival",
            'magyar' => "Városi túlélés",
            'hol' => 'Kategória elnevezés',
        ]);
        Nyelv::create([
            'angol' => "Adaptive fashion",
            'magyar' => "Adaptív divat",
            'hol' => 'Kategória elnevezés',
        ]);
        Nyelv::create([
            'angol' => "Rebirth and renewal",
            'magyar' => "Újjászületés és megújulás",
            'hol' => 'Kategória elnevezés',
        ]);
        Nyelv::create([
            'angol' => "Survival through unity",
            'magyar' => "Túlélés az egységen keresztül",
            'hol' => 'Kategória elnevezés',
        ]);
        Nyelv::create([
            'angol' => "Minimalism and adaptation",
            'magyar' => "Minimalizmus és alkalmazkodás",
            'hol' => 'Kategória elnevezés',
        ]);
        Nyelv::create([
            'angol' => "Warrior spirit",
            'magyar' => "Harcos szellem",
            'hol' => 'Kategória elnevezés',
        ]);

        Nyelv::create([
            'angol' => "Celebrating the strength in diversity",
            'magyar' => "A sokféleségben rejlő erő ünneplése",
            'hol' => 'Kategória elnevezés',
        ]);
        Nyelv::create([
            'angol' => "Cyber survival",
            'magyar' => "Kibernetikus túlélés",
            'hol' => 'Kategória elnevezés',
        ]);
        Nyelv::create([
            'angol' => "Nomad alchemy",
            'magyar' => "Nomád alkímia",
            'hol' => 'Kategória elnevezés',
        ]);
        Nyelv::create([
            'angol' => "Uncharted terrain",
            'magyar' => "Feltérképezetlen terep",
            'hol' => 'Kategória elnevezés',
        ]);
        Nyelv::create([
            'angol' => "Crafting the unknown",
            'magyar' => "Az ismeretlen megformálása",
            'hol' => 'Kategória elnevezés',
        ]);
        Nyelv::create([
            'angol' => "Survival strategies decoded",
            'magyar' => "Túlélési stratégiák dekódolva/megfejtve",
            'hol' => 'Kategória elnevezés',
        ]);

        Nyelv::create([
            'angol' => "Beyond tomorrow",
            'magyar' => "A holnapon túl",
            'hol' => 'Kategória elnevezés',
        ]);
        Nyelv::create([
            'angol' => "Navigating to the unknow",
            'magyar' => "Navigálás az ismeretlen felé",
            'hol' => 'Kategória elnevezés',
        ]);
        Nyelv::create([
            'angol' => "Escape from dystopia",
            'magyar' => "Menekülés a disztópiából",
            'hol' => 'Kategória elnevezés',
        ]);
        Nyelv::create([
            'angol' => "Survival strategies: the art of mimicry",
            'magyar' => "Túlélési stratégiák: a mimikri művészete",
            'hol' => 'Kategória elnevezés',
        ]);


        Nyelv::create([
            'angol' => "Designer",
            'magyar' => "Designer",
            'hol' => 'Szak elnevezés',
        ]);

        Nyelv::create([
            'angol' => "Fashion designer",
            'magyar' => "Divattervő",
            'hol' => 'Szak elnevezés',
        ]);

        Nyelv::create([
            'angol' => "Adrian Kovacs",
            'magyar' => "Kovács Adrián",
            'hol' => 'Alkotó név',
        ]);


        Nyelv::create([
            'angol' => "Maja Hubrics",
            'magyar' => "Hobrics Maja",
            'hol' => 'Alkotó név',
        ]);


        Nyelv::create([
            'angol' => "Kata Vona",
            'magyar' => "Vona Kata",
            'hol' => 'Alkotó név',
        ]);


        Nyelv::create([
            'angol' => "Zoltan Horvath",
            'magyar' => "Horváth Zoltán",
            'hol' => 'Alkotó név',
        ]);

        Nyelv::create([
            'angol' => "aaaaaaaaaangooooooooooooool",
            'magyar' => "maaagyaaaaaaaaaaaaar",
            'hol' => 'Alkotó bemutat',
        ]);

        Nyelv::create([
            'angol' => "aaaaaaaaaangooooooooooooool 222222222",
            'magyar' => "maaagyaaaaaaaaaaaaar 222222222",
            'hol' => 'Alkotó bemutat',
        ]);


        //kepek
        Nyelv::create([
            'angol' => "Bad Future",
            'magyar' => "Rossz jövő",
            'hol' => 'Kép leírás',
        ]);

        Nyelv::create([
            'angol' => "Rain",
            'magyar' => "Eső",
            'hol' => 'Kép leírás',
        ]);

        //galeria

        Nyelv::create([
            'angol' => "elso galeria",
            'magyar' => "elso galeria",
            'hol' => 'Galeria',
        ]);

        Nyelv::create([
            'angol' => "masodik g.",
            'magyar' => "masodik g.",
            'hol' => 'gALERIA   ',
        ]);

        //csapat 
        Nyelv::create([
            'angol' => "Court of Night",
            'magyar' => "Éjszaka Udvara",
            'hol' => 'csapat nev',
        ]);

        Nyelv::create([
            'angol' => "Court of Spring",
            'magyar' => "Tavasz udvara",
           
            'hol' => 'csapat nev',
        ]);
        Nyelv::create([
            'angol' => "Court of Night is the best place, where i ever want to go",
            'magyar' => "Éjszaka Udvara a legjobb hely ahova valaha akartam menni",
            'hol' => 'csapat leiras',
        ]);

        Nyelv::create([
            'angol' => "Court of Spring is a wrong place",
            'magyar' => "Tavasz udvara egy rossz hely",
           
            'hol' => 'csapat leiras',
        ]);
        Nyelv::create([
            'angol' => "apple",
            'magyar' => "alma",
           
            'hol' => 'csapat nev',
        ]);

        Nyelv::create([
            'angol' => "gogogogog",
            'magyar' => "egymegy",
            'hol' => 'csapat leiras',
        ]);

       /*  Nyelv::create([
            'angol' => "engliiiiiiiiish bemutat",
            'magyar' => "bemutatkozás",
            'hol' => 'alkotó bemutat',
        ]);

        Nyelv::create([
            'angol' => "engliiiiiiiiish bemutat",
            'magyar' => "bemutatkozás",
            'hol' => 'alkotó bemutat',
        ]);

        Nyelv::create([
            'angol' => "engliiiiiiiiish bemutat",
            'magyar' => "bemutatkozás",
            'hol' => 'alkotó bemutat',
        ]); */
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nyelvs');
    }
};
