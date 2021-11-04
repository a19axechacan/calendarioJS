
var myCalendarModule = (function () {

    var realDate = new Date();
    var requestedDate = new Date();


    function setDate(any, mes) {
        requestedDate = new Date(any, mes);
    }

    function primerDiaMes(mes, any) {
        let date = new Date(any, mes, 1);
        return date.getDay();
    }

    function ultimaDiaMes(mes, any) {
        let date = new Date(any, mes + 1, 0);
        return date.getDate();
    }

    function getNomMes(date) {
        let messos = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Septembre", "Octubre", "Novembre", "Dessembre"];
        return messos[date.getMonth()];
    }


    function generarTabla() {
        let tabla = "";
        let contador = 0;
        let dies = 1;
        let inici = false;
        let final = false;
        let nomMes = getNomMes(requestedDate);


        let diaAvui = realDate.getDate();
        let primerDia = primerDiaMes(requestedDate.getMonth(), requestedDate.getFullYear());
        let ultimDia = ultimaDiaMes(requestedDate.getMonth(), requestedDate.getFullYear());




        for (let i = 0; i < 6; i++) {
            let tr = "";
            for (let j = 0; j < 7; j++) {
                contador++;
                if (contador == primerDia) {
                    inici = true;
                }
                if (primerDia == 0) {
                    inici = true;
                }
                if (/*contador == primerDia || */inici == true && final == false) {
                    if (dies == diaAvui && (requestedDate.getMonth() == realDate.getMonth())) {
                        tr += `<td id="dataAvui"> ${dies++}</td>`;
                    } else {
                        tr += `<td> ${dies++}  </td>`;
                    }
                    inici = true;
                    if ((dies - 1) == ultimDia) {
                        final = true;
                    }
                } else {
                    tr += `<td class="desactivat"> [ X ] </td>`;
                }



            }

            tabla = tabla + `<tr> ${tr} </tr>`;

        }
        return `<table class='table'>
    <tr><b>${nomMes}</b></tr>
    <thead> 
    <tr>
    <th scope="col">L</th>
    <th scope="col">M</th>
    <th scope="col">X</th>
    <th scope="col">J</th>
    <th scope="col">V</th>
    <th scope="col">S</th>
    <th scope="col">D</th>
    </tr>
    ${tabla}</thead> </table>`;

    }


    return {
        getCalendar: generarTabla,
        setDate: setDate

    };

})();


//---------------------------------------------------------------------
window.onload = function () {

    let buttonAnterior = document.getElementById("buttonAnterior");
    let buttonSeguent = document.getElementById("buttonSeguent");
    let buttonActual = document.getElementById("buttonActual");
    let divCalendario = document.getElementById("calendario");
    let title = document.getElementById("title");
    let currentDate = new Date();
    let displayedYear = currentDate.getFullYear();
    let displayedMonth = currentDate.getMonth();


    title.innerHTML = "Calendari " + currentDate.getFullYear();


    myCalendarModule.setDate(currentDate.getFullYear(), currentDate.getMonth())
    divCalendario.innerHTML = myCalendarModule.getCalendar();

    buttonAnterior.addEventListener("click", function () {

        if (displayedMonth == 0) {
            displayedMonth = 11;
            displayedYear = displayedYear - 1;
            title.innerHTML = "Calendari " + displayedYear;
        } else {
            displayedMonth--;
        }
        myCalendarModule.setDate(displayedYear, displayedMonth);
        divCalendario.innerHTML = myCalendarModule.getCalendar();
    });

    buttonActual.addEventListener("click", function () {
        displayedYear = currentDate.getFullYear();
        displayedMonth = currentDate.getMonth();
        myCalendarModule.setDate(displayedYear, displayedMonth);
        divCalendario.innerHTML = myCalendarModule.getCalendar();
        title.innerHTML = "Calendari " + displayedYear;
    });

    buttonSeguent.addEventListener("click", function () {

        if (displayedMonth == 11) {
            displayedMonth = 0;
            displayedYear = displayedYear + 1;
            title.innerHTML = "Calendari " + displayedYear;
        } else {
            displayedMonth++;
        }
        myCalendarModule.setDate(displayedYear, displayedMonth);
        divCalendario.innerHTML = myCalendarModule.getCalendar();
    });



    let calendarDivs = document.getElementsByClassName("sm-calendar");


    for (let index = 0; index < calendarDivs.length; index++) {
        const element = calendarDivs[index];
        myCalendarModule.setDate(2021, index);
        element.innerHTML = myCalendarModule.getCalendar();
    }








}











