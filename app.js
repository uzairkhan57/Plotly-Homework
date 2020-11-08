// Create a Horizontal bar-chart using sample_values, otu_ids, otu_labels
// Read the data from sample.json
function Getsample(id) {
d3.json("samples.json").then((data) => {

    var samplesData = data.samples;
    // console.log;

    // Filtering for specifIC ID,s
    var SampleResult = samplesData.filter(row => row.id.toString() === id)[0];

    //sorting sample values in descending order
    var otuID = SampleResult.otu_ids;

    //top samples
    var top_Samples = SampleResult.sample_values.slice(0,10).reverse();

    // console.log(top labels);
    var top_labels = sampleResult.otu_labels.slice(0,10).reverse();

    
    // console.log;
    var top_ID = otuID.slice(0,10).reverse();

    // console.log(top_ID);
    var OTU_id = top_ID.map(d => "OTU " + d);
    // console.log(`OTU IDS: ${OTU_id}`)

        // Create plots
        var trace1 = {
            x: top_Samples,
            y: OTU_id,
            text: top_labels,
            type:"bar",
            orientation: "h",
            marker:{
                color: sampleResult.otu_ids
            }
        };

    // Data variable
    var Data = [trace1];

    // creatING layout
    var layout = {
        title: "<b>top  10 OTU</b>",
        height: 600,
        width: 600,
        }

     //Bar plot
     Plotly.newPlot("bar", Data, layout);

    // Create a Bubble chart 
    var Trace2 = {
        x: sampleResult.otu_ids,
        y: sampleResult.sample_values,
        mode: 'markers',
        marker: {
        size: sampleResult.sample_values,
        color: sampleResult.otu_ids
        },
        text: sampleResult.otu_labels,
    };

    var Data2 = [Trace2];
    
    var layout2 = {
        title: '<b>OTU shown in a bubble chart</b>',
        showlegend: false,
        height: 700,
        width: 1000,

    };
    Plotly.newPlot("bubble", Data2, layout2);
    });

}


    //Metadata for each sample
function indivInfo(data) {
    d3.json("samples.json").then((rawdata) => {
        var metadata = rawdata.metadata;
        // console.log(metadata);

        // Filtering id
        var result = metadata.filter(row => row.id.toString() === data)[0];

        //Demographic info 
        var demoInfo = d3.select("#sample-metadata");
        
        // Clear Demographic info for the new info 
        demoInfo.html("");

        // linking Demographic info to id
        Object.entries(result).forEach((key) => {   
            demoInfo.append("body").text(key[0] + ": " + key[1] + "\n");    
        
          });
    
      });

}
//function for default display
function init() {

    // DropDown menu
    var DropDownMenu = d3.select("#selDataset");
    // access raw data from json
    d3.json("samples.json").then((RawData)=> {
        // console.log(RawData)

        // Populate ID data into drop down menu
        RawData.names.forEach(function(name) {
            DropDownMenu.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        var id = d3.select("#selDataset").node().value;
        console.log(id);
      
        // Build the plot with the new stock
        getData(id);
        indivInfo(id);
        
    });
}

// Creating change event trigger
function optionChanged(id) {
    getSample(id);
    indivInfo(id);
    
}

init();