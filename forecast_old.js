// global constant for image tag 
// const lmeImg = document.querySelector('#lmePlot');
const dataID = 'MOM';
const momAni = document.querySelector('#momAnimeIFrame');

// add the variable options based on dataset
createMomVarOpt(dataID)

// add the initial time options 
createMomIniOpt(dataID);

// default animation
createAnimation()

// hide the loading signal when image finish loading
$(momAni).on("load", function () {
    $("div.working").addClass("hidden");
    $("div.error").addClass("hidden");
    $("#momAnime").removeClass("hidden");
    iframeRun();
    errorMomAnime = 0;
});

// hide the loading signal and add the error signal when image not exist
$(momAni).on("error", function () {
    $("div.working").addClass("hidden");
    $("div.error").removeClass("hidden");
    $("#momAnime").addClass("hidden");
    $(this).removeAttr("src");
});

// event listener for the button that update animation
$('#momBtn').on("click", createAnimation);

//execute code after DOM is ready (auto run for first launch only)
function iframeRun() {
    //find iframe
    let iframe = $(momAni);
    //find button inside iframe
    let button = iframe.contents().find('.anim-buttons > button:nth-child(6)');
    //trigger button click
    button.trigger("click");
};

function optionList(listname,listval) {
    let df = document.createDocumentFragment(); // create a document fragment to hold the options while we create them
    for (let i = 0; i < listname.length; i++) { // loop
        let option = document.createElement('option'); // create the option element
        option.value = listval[i]; // set the value property
        option.appendChild(document.createTextNode(listname[i])); // set the textContent in a safe way.
        df.appendChild(option); // append the option to the document fragment
    }
    return df;
};

function createMomVarOpt(dataID) {
    let elm = document.getElementById('varMOM'); // get the select
    let varlist = momVars();
    if (dataID == "MOM") {
        varlist = momVars();
    };
    df = optionList(varlist[0],varlist[1]);
    elm.appendChild(df); // append the document fragment to the DOM. this is the better way rather than setting innerHTML a bunch of times (or even once with a long string)
};

function createMomIniOpt(dataID) {
    let elm = document.getElementById('dateMOM'); // get the select
    let info = modelInfo();
    let dataname = dataID;
    let iniOption = info[dataname]['initial-time'];
    df = optionList(iniOption,iniOption);
    elm.appendChild(df); // append the document fragment to the DOM. this is the better way rather than setting innerHTML a bunch of times (or even once with a long string)
    // assign last option to be the picked options by default
    lastIndex = elm.options.length - 1;
    pickedOption = elm.options[lastIndex];
    pickedOption.selected = true;
};

function createAnimation() {
    let varAM = document.getElementById("varMOM");
    let dateAM = document.getElementById("dateMOM");
    let maxval = document.getElementById("maxval");
    let minval = document.getElementById("minval");
    let nlevel = document.getElementById("nlevel");

    $("#momAnime").addClass("hidden");
    $("div.working").removeClass("hidden");
    $("div.error").addClass("hidden")

    momAni.src = "/cgi-bin/cefi_portal/mom_animate.py"
                +"?variable="+varAM.value
                +"&date="+dateAM.value
                +"&maxval="+maxval.value
                +"&minval="+minval.value
                +"&nlevel="+nlevel.value
}

// functions for options lists (Manual entering)
function momVars() {
    let var_options = [
        "Sea surface temperature anomaly",
        "Sea surface temperature"
    ];
    let var_values = [
        "tos_anom_ensmean",
        "tos_ensmean"
    ];
    return [var_options, var_values];
}


// functions for options lists (Manual entering)
function modelInfo() {
    let models = {
        "MOM":{
            "model":"MOM6",
            "initial-time":[
                "2022-03",
                "2022-06",
                "2022-09",
                "2022-12"
            ]
        }
    };
    return models;
};
