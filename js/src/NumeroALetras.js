/*************************************************************/
// NumeroALetras
// The MIT License (MIT)
// 
// Copyright (c) 2015 Luis Alfredo Chee 
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// @author Rodolfo Carmona
// @contributor Jean (jpbadoino@gmail.com)
/*************************************************************/
module.exports.default = {
    Unidades : function (num){

        switch(num)
        {
            case 1: return "UN";
            case 2: return "DOS";
            case 3: return "TRES";
            case 4: return "CUATRO";
            case 5: return "CINCO";
            case 6: return "SEIS";
            case 7: return "SIETE";
            case 8: return "OCHO";
            case 9: return "NUEVE";
        }

        return "";
    }//Unidades()
    ,
    Decenas : function (num){

        var decena = Math.floor(num/10);
        var unidad = num - (decena * 10);

        switch(decena)
        {
            case 1:
                switch(unidad)
                {
                    case 0: return "DIEZ";
                    case 1: return "ONCE";
                    case 2: return "DOCE";
                    case 3: return "TRECE";
                    case 4: return "CATORCE";
                    case 5: return "QUINCE";
                    default: return "DIECI" + this.Unidades(unidad);
                }
            case 2:
                switch(unidad)
                {
                    case 0: return "VEINTE";
                    default: return "VEINTI" + this.Unidades(unidad);
                }
            case 3: return this.DecenasY("TREINTA", unidad);
            case 4: return this.DecenasY("CUARENTA", unidad);
            case 5: return this.DecenasY("CINCUENTA", unidad);
            case 6: return this.DecenasY("SESENTA", unidad);
            case 7: return this.DecenasY("SETENTA", unidad);
            case 8: return this.DecenasY("OCHENTA", unidad);
            case 9: return this.DecenasY("NOVENTA", unidad);
            case 0: return this.Unidades(unidad);
        }
    }//Unidades()
    ,
    DecenasY: function (strSin, numUnidades) {
        if (numUnidades > 0)
        return strSin + " Y " + this.Unidades(numUnidades)

        return strSin;
    }//DecenasY()
    ,
    Centenas: function (num) {
        var centenas = Math.floor(num / 100);
        var decenas = num - (centenas * 100);

        switch(centenas)
        {
            case 1:
                if (decenas > 0)
                    return "CIENTO " + this.Decenas(decenas);
                return "CIEN";
            case 2: return "DOSCIENTOS " + this.Decenas(decenas);
            case 3: return "TRESCIENTOS " + this.Decenas(decenas);
            case 4: return "CUATROCIENTOS " + this.Decenas(decenas);
            case 5: return "QUINIENTOS " + this.Decenas(decenas);
            case 6: return "SEISCIENTOS " + this.Decenas(decenas);
            case 7: return "SETECIENTOS " + this.Decenas(decenas);
            case 8: return "OCHOCIENTOS " + this.Decenas(decenas);
            case 9: return "NOVECIENTOS " + this.Decenas(decenas);
        }

        return this.Decenas(decenas);
    }//Centenas()
    ,
    Seccion: function (num, divisor, strSingular, strPlural) {
        var cientos = Math.floor(num / divisor)
        var resto = num - (cientos * divisor)

        var letras = "";

        if (cientos > 0)
            if (cientos > 1)
                letras = this.Centenas(cientos) + " " + strPlural;
            else
                letras = strSingular;

        if (resto > 0)
            letras += "";

        return letras;
    }//Seccion()
    ,
    Miles: function (num) {
        var divisor = 1000;
        var cientos = Math.floor(num / divisor)
        var resto = num - (cientos * divisor)

        var strMiles = this.Seccion(num, divisor, "UN MIL", "MIL");
        var strCentenas = this.Centenas(resto);

        if(strMiles == "")
            return strCentenas;

        return strMiles + " " + strCentenas;
    }//Miles()
    ,
    Millones: function (num) {
        var divisor = 1000000;
        var cientos = Math.floor(num / divisor)
        var resto = num - (cientos * divisor)

        var strMillones = this.Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
        var strMiles = this.Miles(resto);

        if(strMillones == "")
            return strMiles;

        return strMillones + " " + strMiles;
    }//Millones()
    ,
    NumeroALetras: function (num) {
        var data = {
            numero: num,
            enteros: Math.floor(num),
            centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
            letrasCentavos: "",
            letrasMonedaPlural: 'PESOS',//"PESOS", 'Dólares', 'Bolívares', 'etcs'
            letrasMonedaSingular: 'PESO', //"PESO", 'Dólar', 'Bolivar', 'etc'

            letrasMonedaCentavoPlural: "CENTAVOS",
            letrasMonedaCentavoSingular: "CENTAVO"
        };

        if (data.centavos > 0) {
            data.letrasCentavos = "CON " + (function (){
                if (data.centavos == 1)
                    return this.Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
                else
                    return this.Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
                }.bind(this))();
        };

        if(data.enteros == 0)
            return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
        if (data.enteros == 1)
            return this.Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
        else
            return this.Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    }//NumeroALetras()
    ,
};