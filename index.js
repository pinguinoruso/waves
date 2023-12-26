

function createWaveGraphic(element, options, values){

	let max = values[0];
	for(i=0; i < values.length; i++){
		if(values[i] > max) max = values[i];
	}

	options['lines'] = options['lines'] ?? true;
	options['guides'] = Boolean(options["guides"]) ?? true;
	options['points'] = options['points'] ?? true;
	options['rulers'] = options['rulers'] ?? false;

    //Preferences
	options['guideSize'] = isNaN(Number(options['guideSize'])) ? 1 : Number(options['guideSize']);
	options['pointRadius'] = isNaN(Number(options['pointRadius'])) ? 1 : Number(options['pointRadius']);
    options['leftMargin'] = isNaN(Number(options['leftMargin'])) ? 1 : Number(options['leftMargin']);
    options['bottomMargin'] = isNaN(Number(options['bottomMargin'])) ? 1 : Number(options['bottomMargin']);



    let colors = ['red', 'green', 'blue', 'violet', 'cyan', 'orange', 'yellow', "magenta"];

    let eachColorPoint = []

    
    
    
    
	max = max +1
    
	const canvas = document.createElement("canvas");
	canvas.height = element.clientHeight;
	canvas.width = element.clientWidth;
	canvas.style.objectFit = "cover";
	const ctx = canvas.getContext("2d");

    let lmargin = canvas.width * .075 * options['leftMargin']
    let bmargin = canvas.height * .1 * options['bottomMargin']
	
	ctx.fillStyle = options?.backgroundColor || "#000033"
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    if(!options.colors || options.colors.length <= 0){
        for(let i =0; i < values.length; i++){
            eachColorPoint[i] = colors[Math.floor(Math.random() * colors.length)];
        }
    }else for(let i =0; i < values.length; i++){
            eachColorPoint[i] = options.colors[i % options.colors.length]
        }
    
	if(options.lines){
		let yLine = new Path2D();
		yLine.rect(
			 lmargin - canvas.width * .005 /2, 
			0, 
			canvas.width * .005, 
			canvas.height - bmargin
            );
		yLine.closePath();
		ctx.fillStyle = options?.lineColor || "#ffffff99";
		ctx.fill(yLine, "evenodd");
	
		let xline = new Path2D();
		xline.rect(
			lmargin, 
			canvas.height - bmargin - canvas.height * .01 /2, 
			canvas.width * 1, 
			canvas.height * .01
			);
		xline.closePath();
		ctx.fillStyle = options?.lineColor || "#ffffff99";
		ctx.fill(xline, "evenodd");

	}
    if(options.area){
        let area = new Path2D();
        for(let i = 0; i <= values.length; i++){
                area.lineTo(
                    canvas.width / max * i + lmargin, 
                    Math.max(canvas.height - bmargin - (canvas.height - bmargin) / max * values[i], 0), 
                )
        }

        area.lineTo(
            canvas.width / max * (values.length-1) + lmargin,
            canvas.height - bmargin,    
        )

        area.lineTo(lmargin, canvas.height - bmargin)
        
        area.closePath();
        ctx.strokeStyle = "green";
        ctx.stroke(area, "evenodd")
        ctx.fillStyle =  "#ff000099";
        ctx.fill(area, "nonzero");
    }

	if(options.guides){
		let xguides = new Path2D();
		for(let i = 0; i <= values.length; i++){
            let guideW = canvas.width * 0.005 * options.guideSize;
			xguides.rect(
				canvas.width / max * i + lmargin - guideW/2, 
				canvas.height - bmargin - canvas.height*.04/2, 
				guideW, 
				canvas.height * .04
				)
		}
		xguides.closePath();
		ctx.fillStyle = options?.guidesColor || "#ffffff99";
		ctx.fill(xguides, "evenodd");

		let yguides = new Path2D();
		for(let i = 0; i <= max+1; i++){
            let guideH = canvas.height * .01 * options.guideSize;
			yguides.rect(
				lmargin - canvas.width * .03/2 ,
				canvas.height - bmargin - (canvas.height - bmargin) / max * i - guideH /2,
				canvas.width * .03,
				guideH
				)
		}
		yguides.closePath();
		ctx.fillStyle = options?.guidesColor || "#ffffff99";
		ctx.fill(yguides, "evenodd");
	}
	
	if(options.trace){
        ctx.setLineDash([5])
		
		for(let i = 0; i <= values.length; i++){
			let lines = new Path2D();
			lines.moveTo(
				    canvas.width / max * (Math.max(i-1, 0)) + lmargin, 
				    Math.max(canvas.height - bmargin - (canvas.height - bmargin) / max * values[Math.max(i-1, 0)], 0) 
				)
				lines.lineTo(
					canvas.width / max * i + lmargin, 
				    Math.max(canvas.height - bmargin - (canvas.height - bmargin) / max * values[i], 0), 
			    )
			lines.closePath();
			ctx.strokeStyle = options?.traceColor || "#ff0000";
			ctx.stroke(lines, "nonzero");
		}
        ctx.setLineDash([])
	}

    
    
    
	if(options.rulers){
        let xguides = new Path2D();
		for(let i = 0; i <= Math.max(values.length, 10); i++){
            xguides.moveTo(
                canvas.width / max * i + lmargin, 
				0
				)
			xguides.lineTo(
				canvas.width / max * i + lmargin,
				canvas.height - bmargin
			)
		}
		xguides.closePath();
		ctx.strokeStyle = options?.guidesColor || "#ffffff99";
		ctx.stroke(xguides, "evenodd");
	
		let yguides = new Path2D();
		for(let i = 0; i <= max+1; i++){
			yguides.moveTo(
				lmargin,
				canvas.height - bmargin - (canvas.height - bmargin) / max * i,
				)
			yguides.lineTo(
				canvas.width,
				canvas.height - bmargin - (canvas.height - bmargin) / max * i
			)
		}
		yguides.closePath();
		ctx.strokeStyle = options?.guidesColor || "#ffffff99";
		ctx.stroke(yguides, "evenodd");

	}


    if(options.pointRulers){

        for(let i = 0; i <= values.length; i++){
            let lines = new Path2D();
            lines.moveTo(
                canvas.width / max * i + lmargin, 
                Math.max(canvas.height - bmargin - (canvas.height - bmargin) / max * values[i], 0), 
            )
            lines.lineTo(
                lmargin, 
                Math.max(canvas.height - bmargin - (canvas.height - bmargin) / max * values[i], 0), 
            )
    
            
            lines.closePath();
            ctx.strokeStyle = ctx.strokeStyle = eachColorPoint[i] || "green";
            ctx.stroke(lines, "nonzero");
        }
        for(let i = 0; i <= values.length; i++){
            let lines = new Path2D();
    
            lines.moveTo(
                canvas.width / max * i + lmargin, 
                Math.max(canvas.height - bmargin - (canvas.height - bmargin) / max * values[i], 0), 
            )
    
            lines.lineTo(
                canvas.width / max * i + lmargin, 
                canvas.height - bmargin, 
            )
    
            
            lines.closePath();
            ctx.strokeStyle = eachColorPoint[i] || "green";
            ctx.stroke(lines, "nonzero");
        }
    }
    
    

	if(options.points){
		for(let i = 0; i <= max; i++){
			let path = new Path2D();
			path.arc(
				canvas.width / max * i + lmargin, 
				Math.max(canvas.height - bmargin - (canvas.height - bmargin) / max * values[i], 0), 
				3 * options.pointRadius,
				0,
				2 * Math.PI,
				true
				);
			path.closePath();
			ctx.fillStyle = options?.pointsColor || "#ff0000";
			ctx.fill(path, "evenodd");
		}
	}

	
	
	element.append(canvas);
	window.onresize = () => {
		canvas.remove();
		createWaveGraphic(element, options, values)
	}

    


    element.onresize = () => {
        console.log("exec")

            canvas.remove();
		    createWaveGraphic(element, options, values)

    }
}


//Options

module.exports = {createWaveGraphic};

