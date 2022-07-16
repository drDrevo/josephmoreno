const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    BSDBIN:   Symbol("bsdbin"),
    MTYPE:   Symbol("mtype"),    
    BULB: Symbol("bulb"),
    UPSELL:  Symbol("upsell")
});

module.exports = class KhandaniHardware extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sbsdbin = "";
        this.sMtype = "";        
        this.sBulb = "";
        this.sUpsell = "";
        this.sTotal = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.BSDBIN;
                aReturn.push("Welcome to Khandani Hardware Shop.");
                aReturn.push(`For a list of items that we sell please tap:`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);                
                aReturn.push("Would you like 'BROOMSTICK' or 'DUSTBIN'?");
                break;
            case OrderState.BSDBIN:
                if((sInput.toLowerCase() == "broomstick") || (sInput.toLowerCase() == "dustbin")){
                    this.sbsdbin = sInput.toUpperCase()
                    if(sInput.toLowerCase() == "broomstick")
                    {
                        this.sTotal += 9;
                    }
                    else
                    {
                        this.sTotal += 11;
                    }
                    this.stateCur = OrderState.MTYPE;
                    aReturn.push("Which " + this.sbsdbin.toLowerCase() + " Mop would you like with that WET or DRY?");
                }
                else
                {
                    aReturn.push("Input invalid! Please type broomstick or dustbin");
                    this.stateCur = OrderState.BSDBIN;
                }
                break;
            case OrderState.MTYPE:                
                if((sInput.toLowerCase() == "wet") || (sInput.toLowerCase() == "dry")){
                    this.sMtype = sInput.toUpperCase();
                    if(sInput.toLowerCase() == "wet")
                    {
                        this.sTotal += 4;
                    }
                    else{
                        this.sTotal += 5;
                    }
                    this.stateCur = OrderState.BULB;
                    aReturn.push("Which Lightbulb would you like HALOGEN or LED. if you don't want say NO");
                }
                else
                {
                    aReturn.push("Invalid input! Please enter wet or dry");
                    this.stateCur = OrderState.MTYPE;
                }
                break;

            case OrderState.BULB:                
                if((sInput.toLowerCase() == "no") || (sInput.toLowerCase() == "halogen") || (sInput.toLowerCase() == "led")){
                    this.sBulb = sInput.toUpperCase();
                    if(sInput.toLowerCase() == "halogen")
                    {
                        this.sTotal += 7;
                    }
                    else if(sInput.toLowerCase() == "led"){
                        this.sTotal += 9;
                    }
                    else {
                        this.sTotal += 0;
                    }
                    this.stateCur = OrderState.UPSELL;
                    aReturn.push("Would you like any extra like CARCLOTHS or EARBUDS with that? if you don't want say NO.");
                }
                else
                {
                    aReturn.push("Invalid input! Please enter HALOGEN or LED or NO");
                    this.stateCur = OrderState.BULB;
                }
                break;

            case OrderState.UPSELL:
                if((sInput.toLowerCase() == "no") || (sInput.toLowerCase() == "carcloths") || (sInput.toLowerCase() == "earbuds")){
                    this.sUpsell = sInput.toUpperCase();
                    if(sInput.toLowerCase() == "carcloths")
                    {
                        this.sTotal += 7;
                    }
                    else if(sInput.toLowerCase() == "earbuds")
                    {
                        this.sTotal += 11;
                    }
                    else{
                        this.sTotal += 0;
                    }

                    this.sTotal = this.sTotal + (this.sTotal * 0.13 );

                    aReturn.push("Thank-you for your order of ");
                    aReturn.push(`${this.sMtype} ${this.sbsdbin}  and  ${this.sBulb} LIGHTBULB  WITH   ${this.sUpsell} UPSELL ITEM `);
                    aReturn.push(`Your total comes to $  ${this.sTotal.toFixed(2)} including tax`);
                    aReturn.push(`We will text you from 226-201-5250 when your order is ready or if we have any questions.`)
                    this.isDone(true);
                }
                else{
                    aReturn.push("Invalid Input! Please enter CarCloths or Earbuds or NO.");
                    this.stateCur = OrderState.UPSELL;
                }                
        }
        return aReturn;
    }
    renderForm(){
      // your client id should be kept private
      return(`
      <html>

<head>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type">
    <style type="text/css">
        ol {
            margin: 0;
            padding: 0
        }

        table td,
        table th {
            padding: 0
        }

        .c5 {
            border-right-style: solid;
            padding: 5pt 5pt 5pt 5pt;
            border-bottom-color: #000000;
            border-top-width: 1pt;
            border-right-width: 1pt;
            border-left-color: #000000;
            vertical-align: top;
            border-right-color: #000000;
            border-left-width: 1pt;
            border-top-style: solid;
            border-left-style: solid;
            border-bottom-width: 1pt;
            width: 317.5pt;
            border-top-color: #000000;
            border-bottom-style: solid
        }

        .c20 {
            border-right-style: solid;
            padding: 5pt 5pt 5pt 5pt;
            border-bottom-color: #000000;
            border-top-width: 1pt;
            border-right-width: 1pt;
            border-left-color: #000000;
            vertical-align: top;
            border-right-color: #000000;
            border-left-width: 1pt;
            border-top-style: solid;
            border-left-style: solid;
            border-bottom-width: 1pt;
            width: 96.2pt;
            border-top-color: #000000;
            border-bottom-style: solid
        }

        .c27 {
            border-right-style: solid;
            padding: 5pt 5pt 5pt 5pt;
            border-bottom-color: #000000;
            border-top-width: 1pt;
            border-right-width: 1pt;
            border-left-color: #000000;
            vertical-align: top;
            border-right-color: #000000;
            border-left-width: 1pt;
            border-top-style: solid;
            border-left-style: solid;
            border-bottom-width: 1pt;
            width: 95pt;
            border-top-color: #000000;
            border-bottom-style: solid
        }

        .c19 {
            border-right-style: solid;
            padding: 5pt 5pt 5pt 5pt;
            border-bottom-color: #000000;
            border-top-width: 1pt;
            border-right-width: 1pt;
            border-left-color: #000000;
            vertical-align: top;
            border-right-color: #000000;
            border-left-width: 1pt;
            border-top-style: solid;
            border-left-style: solid;
            border-bottom-width: 1pt;
            width: 59.5pt;
            border-top-color: #000000;
            border-bottom-style: solid
        }

        .c9 {
            border-right-style: solid;
            padding: 5pt 5pt 5pt 5pt;
            border-bottom-color: #000000;
            border-top-width: 1pt;
            border-right-width: 1pt;
            border-left-color: #000000;
            vertical-align: top;
            border-right-color: #000000;
            border-left-width: 1pt;
            border-top-style: solid;
            border-left-style: solid;
            border-bottom-width: 1pt;
            width: 313.5pt;
            border-top-color: #000000;
            border-bottom-style: solid
        }

        .c3 {
            border-right-style: solid;
            padding: 5pt 5pt 5pt 5pt;
            border-bottom-color: #000000;
            border-top-width: 1pt;
            border-right-width: 1pt;
            border-left-color: #000000;
            vertical-align: top;
            border-right-color: #000000;
            border-left-width: 1pt;
            border-top-style: solid;
            border-left-style: solid;
            border-bottom-width: 1pt;
            width: 60.2pt;
            border-top-color: #000000;
            border-bottom-style: solid
        }

        .c2 {
            margin-left: 122pt;
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.0;
            orphans: 2;
            widows: 2;
            text-align: center;
            margin-right: 115pt
        }

        .c4 {
            margin-left: 27pt;
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.0;
            orphans: 2;
            widows: 2;
            text-align: center;
            margin-right: 20pt
        }

        .c24 {
            margin-left: 6pt;
            padding-top: 12pt;
            padding-bottom: 12pt;
            line-height: 1.0;
            orphans: 2;
            widows: 2;
            text-align: center
        }

        .c0 {
            color: #ff0000;
            font-weight: 700;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 8pt;
            font-family: "Arial";
            font-style: normal
        }

        .c13 {
            margin-left: 11pt;
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.0;
            orphans: 2;
            widows: 2;
            text-align: center
        }

        .c30 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: center;
            height: 11pt
        }

        .c14 {
            padding-top: 10pt;
            padding-bottom: 0pt;
            line-height: 1.0;
            orphans: 2;
            widows: 2;
            text-align: center;
            margin-right: 138pt
        }

        .c18 {
            margin-left: 6pt;
            padding-top: 0pt;
            padding-bottom: 12pt;
            line-height: 1.0;
            orphans: 2;
            widows: 2;
            text-align: center
        }

        .c7 {
            color: #000000;
            font-weight: 400;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 8pt;
            font-family: "Arial";
            font-style: normal
        }

        .c29 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .c23 {
            font-weight: 400;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 15pt;
            font-family: "Arial";
            font-style: normal
        }

        .c35 {
            font-weight: 400;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 11pt;
            font-family: "Arial";
            font-style: normal
        }

        .c39 {
            padding-top: 12pt;
            padding-bottom: 12pt;
            line-height: 1.0;
            orphans: 2;
            widows: 2;
            text-align: center
        }

        .c10 {
            padding-top: 12pt;
            padding-bottom: 12pt;
            line-height: 1.0;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .c36 {
            font-weight: 400;
            text-decoration: none;
            vertical-align: baseline;
            font-family: "Arial";
            font-style: normal
        }

        .c11 {
            border-spacing: 0;
            border-collapse: collapse;
            margin-right: auto
        }

        .c32 {
            background-color: #ffffff;
            max-width: 468pt;
            padding: 72pt 72pt 72pt 72pt
        }

        .c15 {
            color: #00b0f0;
            font-size: 18pt
        }

        .c21 {
            color: #ff0000;
            font-size: 18pt
        }

        .c6 {
            font-size: 10pt;
            font-weight: 700
        }

        .c28 {
            font-size: 14pt;
            font-weight: 700
        }

        .c40 {
            font-weight: 700
        }

        .c16 {
            height: 0pt
        }

        .c41 {
            height: 5.4pt
        }

        .c33 {
            font-size: 10pt
        }

        .c25 {
            color: #ff0000
        }

        .c17 {
            color: #274e13
        }

        .c1 {
            font-size: 12pt
        }

        .c26 {
            margin-right: 89pt
        }

        .c38 {
            color: #00b0f0
        }

        .c34 {
            height: 34.8pt
        }

        .c22 {
            height: 18.2pt
        }

        .c31 {
            color: #38761d
        }

        .c12 {
            color: #002060
        }

        .c37 {
            color: #000000
        }

        .c8 {
            height: 34pt
        }

        .title {
            padding-top: 0pt;
            color: #000000;
            font-size: 26pt;
            padding-bottom: 3pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .subtitle {
            padding-top: 0pt;
            color: #666666;
            font-size: 15pt;
            padding-bottom: 16pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        li {
            color: #000000;
            font-size: 11pt;
            font-family: "Arial"
        }

        p {
            margin: 0;
            color: #000000;
            font-size: 11pt;
            font-family: "Arial"
        }

        h1 {
            padding-top: 20pt;
            color: #000000;
            font-size: 20pt;
            padding-bottom: 6pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h2 {
            padding-top: 18pt;
            color: #000000;
            font-size: 16pt;
            padding-bottom: 6pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h3 {
            padding-top: 16pt;
            color: #434343;
            font-size: 14pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h4 {
            padding-top: 14pt;
            color: #666666;
            font-size: 12pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h5 {
            padding-top: 12pt;
            color: #666666;
            font-size: 11pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h6 {
            padding-top: 12pt;
            color: #666666;
            font-size: 11pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            font-style: italic;
            orphans: 2;
            widows: 2;
            text-align: left
        }
    </style>
</head>

<body class="c32">
    <p class="c10 c26"><span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span
            class="c25">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span class="c25 c1 c36">Welcome To</span></p>
    <p class="c26 c39"><span class="c21">&nbsp; &nbsp; &nbsp;</span><span class="c36 c25 c1">Khandani Hardware
            Shop:</span></p>
    <p class="c14"><span class="c15">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span class="c1 c38">&nbsp;
            &nbsp;For Curbside Pickup:</span><span class="c1">&nbsp;Text us on </span><span
            class="c1 c12">226-201-5250</span></p>
    <p class="c10"><span class="c6">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span
            class="c6 c31">Main</span></p><a id="t.0b26823db3eba2cd3658c12e78db35c9ca8b417e"></a><a id="t.0"></a>
    <table class="c11">
        <tr class="c16">
            <td class="c19" colspan="1" rowspan="1">
                <p class="c18"><span class="c0">Index</span></p>
            </td>
            <td class="c9" colspan="1" rowspan="1">
                <p class="c2"><span class="c0">Products</span></p>
            </td>
            <td class="c27" colspan="1" rowspan="1">
                <p class="c4"><span class="c0">Price</span></p>
            </td>
        </tr>
        <tr class="c22">
            <td class="c19" colspan="1" rowspan="1">
                <p class="c24"><span class="c7">1.</span></p>
            </td>
            <td class="c9" colspan="1" rowspan="1">
                <p class="c13"><span class="c7">Broomstick (Wet)</span></p>
            </td>
            <td class="c27" colspan="1" rowspan="1">
                <p class="c4"><span class="c7">$15</span></p>
            </td>
        </tr>
        <tr class="c41">
            <td class="c19" colspan="1" rowspan="1">
                <p class="c24"><span class="c7">2.</span></p>
            </td>
            <td class="c9" colspan="1" rowspan="1">
                <p class="c13"><span class="c7">Dustbin (Wet)</span></p>
            </td>
            <td class="c27" colspan="1" rowspan="1">
                <p class="c4"><span class="c7">$20</span></p>
            </td>
        </tr>
        <tr class="c8">
            <td class="c19" colspan="1" rowspan="1">
                <p class="c18"><span class="c7">3.</span></p>
            </td>
            <td class="c9" colspan="1" rowspan="1">
                <p class="c13"><span class="c7">Broomstick (Dry)</span></p>
            </td>
            <td class="c27" colspan="1" rowspan="1">
                <p class="c4"><span class="c7">$20</span></p>
            </td>
        </tr>
        <tr class="c16">
            <td class="c19" colspan="1" rowspan="1">
                <p class="c24"><span class="c7">4.</span></p>
            </td>
            <td class="c9" colspan="1" rowspan="1">
                <p class="c13"><span class="c7">Dustbin (Dry)</span></p>
            </td>
            <td class="c27" colspan="1" rowspan="1">
                <p class="c4"><span class="c7">$25</span></p>
            </td>
        </tr>
    </table>
    <p class="c29"><span class="c33">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="c28 c25">&nbsp; &nbsp; &nbsp; </span><span
            class="c6 c31">Bulbs</span></p><a id="t.503684bef31b32277b61cbd9b1edd37d373e4ed1"></a><a id="t.1"></a>
    <table class="c11">
        <tr class="c8">
            <td class="c3" colspan="1" rowspan="1">
                <p class="c18"><span class="c0">Index</span></p>
            </td>
            <td class="c5" colspan="1" rowspan="1">
                <p class="c2"><span class="c0">Products</span></p>
            </td>
            <td class="c20" colspan="1" rowspan="1">
                <p class="c4"><span class="c0">Price</span></p>
            </td>
        </tr>
        <tr class="c34">
            <td class="c3" colspan="1" rowspan="1">
                <p class="c24"><span class="c7">1.</span></p>
            </td>
            <td class="c5" colspan="1" rowspan="1">
                <p class="c13"><span class="c7">Halogen</span></p>
            </td>
            <td class="c20" colspan="1" rowspan="1">
                <p class="c4"><span class="c7">$15</span></p>
            </td>
        </tr>
        <tr class="c34">
            <td class="c3" colspan="1" rowspan="1">
                <p class="c24"><span class="c7">2.</span></p>
            </td>
            <td class="c5" colspan="1" rowspan="1">
                <p class="c13"><span class="c7">Led</span></p>
            </td>
            <td class="c20" colspan="1" rowspan="1">
                <p class="c4"><span class="c7">$20</span></p>
            </td>
        </tr>
    </table>
    <p class="c29"><span class="c25 c28">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="c25 c1 c40">&nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span class="c6 c17">Upsell</span></p><a
        id="t.3f39bacffc4cb526efd5af5ae2bfcca8a6e12cf6"></a><a id="t.2"></a>
    <table class="c11">
        <tr class="c8">
            <td class="c3" colspan="1" rowspan="1">
                <p class="c18"><span class="c0">Index</span></p>
            </td>
            <td class="c5" colspan="1" rowspan="1">
                <p class="c2"><span class="c0">Products</span></p>
            </td>
            <td class="c20" colspan="1" rowspan="1">
                <p class="c4"><span class="c0">Price</span></p>
            </td>
        </tr>
        <tr class="c34">
            <td class="c3" colspan="1" rowspan="1">
                <p class="c24"><span class="c7">1.</span></p>
            </td>
            <td class="c5" colspan="1" rowspan="1">
                <p class="c13"><span class="c7">Carcloths</span></p>
            </td>
            <td class="c20" colspan="1" rowspan="1">
                <p class="c4"><span class="c7">$15</span></p>
            </td>
        </tr>
        <tr class="c34">
            <td class="c3" colspan="1" rowspan="1">
                <p class="c24"><span class="c7">2.</span></p>
            </td>
            <td class="c5" colspan="1" rowspan="1">
                <p class="c13"><span class="c7">Earbuds</span></p>
            </td>
            <td class="c20" colspan="1" rowspan="1">
                <p class="c4"><span class="c7">$20</span></p>
            </td>
        </tr>
    </table>
    <p class="c30"><span class="c36 c33 c37"></span></p>
</body>

</html> `);
  
    }
}
