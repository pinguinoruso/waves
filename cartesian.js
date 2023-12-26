function createCartesianGraphic(element, options, values){
    const canvas = document.createElement("canvas");
	canvas.height = element.clientHeight;
	canvas.width = element.clientWidth;
	canvas.style.objectFit = "cover";
	const ctx = canvas.getContext("2d");


    if(options.lines){
        let lines = new Path2D();
        lines.moveTo()
    }

}