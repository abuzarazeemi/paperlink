import  FileAction  from "~/models/FileAction";
//@ts-ignore
import $ from "jquery"

export const  formatStyleTop = (x: string, String: string) => {
   let sliceString = String.substring(
     String.indexOf(x) + x.length + 1,
     String.indexOf('px')
   )
   return  parseFloat(sliceString.trim())
 }

 let formatStyleLeft = (x: string, String: string) => {
   let sliceString = String.substring(
     String.indexOf(x) + x.length + 1,
     String.lastIndexOf('px')
   )
   return  parseFloat(sliceString.trim())
 }

 export const appendEditText = ({
   parent,
   subParent,
   attr,
   tools,
   elem,
   axisX,
   axisY,
   fontsize
 } : any) => {
   ;(parent.data as any).push({
     page_number: subParent.indexOf(elem),
     y: formatStyleTop('top', attr),
     x: formatStyleLeft('left', attr),
     type: 'DrawText',
     text: tools,
     axisX: axisX[1]-axisX[0],
     axisY: axisY[1]>axisY[0] ? axisY[1]-axisY[0] : axisY[0]-axisY[1],
     size: formatStyleTop('font-size', fontsize) 
   })
 }


export const  appendEditTextInput = (
   parent: any,
   subParent: any,
   attr: string,
   tools: any,
   elem: any,
   fontsize: string
 ) => {
   ;(parent.data as any).push({
     page_number: subParent.indexOf(elem),
     y: formatStyleTop('top', attr),
     x: formatStyleLeft('left', attr),
     type: 'DrawText',
     text: tools,
     size: Number(formatStyleTop('font-size', fontsize) )
   })
 }




export const appendEditElement = ({
   parent,
   subParent,
   attr,
   tools,
   option,
   elem,
   x1,
   y1,
   y2,
   x2,
   type,
   axisX,
   axisY,
   length,
   svgImagePath,
   svgWidth,
   svgHeight,
   elemScale,
} : any) => {
   ;(parent.data as any).push({
     page_number: subParent.indexOf(elem),
     y: (parseFloat(y1) || formatStyleTop('top', attr)),
     x: (parseFloat(x1) || formatStyleLeft('left', attr)),
     svgPath: tools,
     axisX: axisX[1]-axisX[0],
     axisY: axisY[1]>axisY[0] ? axisY[1]-axisY[0] : axisY[0]-axisY[1],
     type: type || "Annotation",
     option: option,
     elemScale: elemScale,
     length,
     y2: Number(y2),
     x2: Number(x2),
     svgImagePath,
     svgWidth,
     svgHeight,
   })
 }


  export const appendUserActionElement = ({
    parent,
    subParent,
    attr,
    option,
    elem,
    x1,
    y1,
    type,
    tool,
    axisX,
    axisY,
    axisX2,
    axisY2,
    pdfHeight,
    pdfWidth,
    height,
    actionStore,
    uploaded,
  } : any) => {
     //adding to the array for all annotation
    ;(parent.data as any).push({
      page_number: subParent.indexOf(elem),
      y: (parseFloat(y1) || formatStyleTop('top', attr)),
      x: (parseFloat(x1) || formatStyleLeft('left', attr)),
      type: "Image",
      uploaded,
      axisX: axisX[1]-axisX[0],
      axisY: axisY[1]>axisY[0] ? axisY[1]-axisY[0] : axisY[0]-axisY[1],
      axisX2: axisX2[1]-axisX2[0],
      axisY2: axisY2[1]-axisY2[0],
      base64: tool.children[0].src,
      width: tool.children[0].clientWidth,
      height: tool.children[0].clientHeight
    })
    //adding to the array for only annotations of sign and initial
    ;(actionStore as any).push({
      page_number: subParent.indexOf(elem),
      y: (parseFloat(y1) || formatStyleTop('top', attr)),
      x: (parseFloat(x1) || formatStyleLeft('left', attr)),
      type: "appendHtmlElement",
      axisX: axisX[1]-axisX[0],
      axisY: axisY[1]>axisY[0] ? axisY[1]-axisY[0] : axisY[0]-axisY[1],
      title: option,
      pdfHeight,
      pdfWidth,
      height
    })
  }


  export const appendEditImage = ({
    parent,
    subParent,
    attr,
    tools,
    elem,
    option,
    x1,
    y1,
    axisX,
    axisY,
    width,
    height,
    axisX2,
    axisY2,
    scaleDiff
  } : any) => {
    ;(parent.data as any).push({
      page_number: subParent.indexOf(elem),
      y: (parseFloat(y1) || formatStyleTop('top', attr)) + (parseFloat(width)*0.27)/2,
      x: (parseFloat(x1) || formatStyleLeft('left', attr)) + (parseFloat(height)*0.27)/2,
      base64: tools,
      type: "Image",
      option: option,
      axisX: axisX[1]-axisX[0],
      axisX2: axisX2[1]-axisX2[0],
      axisY2: axisY2[1]-axisY2[0],
      axisY: axisY[1]>axisY[0] ? axisY[1]-axisY[0] : axisY[0]-axisY[1],
      elemScale:scaleDiff,
      width: parseFloat(width)*0.73,
      height: parseFloat(height)*0.73
    })
  }


  // export const svgToImage = (item : SVGElement)=>{
  // let imageData = ''

  // var svgMain = item;
  // let svg = svgMain.cloneNode(true);
  // (svg as SVGElement).style.removeProperty('width');
  // var svgData = new XMLSerializer().serializeToString(svg);
  // var canvas = document.createElement("canvas");
  // var svgSize = svgMain.getBoundingClientRect();
  // canvas.width = svgSize.width ;
  // canvas.height = svgSize.height ;
  // (canvas as any).style.width = svgSize.width;
  // (canvas as any).style.height = svgSize.height;
  // var ctx = canvas.getContext("2d");
  // // ctx.scale(3, 3);
  // var img = document.createElement("img");
  // img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));

  // var canvasdata = ''

  //  function checkImge(){
  //    new Promise((resolve, reject) => {
  //     const image = new Image();
  //     image.crossOrigin = 'anonymous';
  //     image.addEventListener('load', () => {
  //       resolve(img);
  //       console.log(img)
  //     });
  //     image.addEventListener('error', error => {
  //       reject(error);
  //     });
  //   });

  //   // console.log(img);
  //   (ctx as any).drawImage(img, 0, 0)
  //   canvasdata =  canvas.toDataURL("image/png", 1)
  //   imageData = canvasdata
  //   // console.log("canvgs asgvj",canvasdata, svg)
  // }
  //  checkImge()
  //   // document.querySelectorAll(".pdf-page")[0]?.appendChild(img)
  // return imageData
  // }


  export const appendDefaultConfirmSign =({
    parent,
    subParent,
    signaturePath,
    elem,
    option,
    type,
   } : any) => {
    (parent.data as any).push({
      page_number: subParent.indexOf(elem),
      signaturePath,
      option,
      type:'confirm'
    })
  }

  export const appendDefaultConfirmText =({
    parent,
    subParent,
    text,
    elem,
    option,
    type
   } : any) => {
    (parent.data as any).push({
      page_number: subParent.indexOf(elem),
      text,
      option,
      type:'confirm'
    })
    console.log(text)
  }



   export const  ExtractFormPdf = (downloadLink: string, file : any)  => {
      let pdfScrappedData = {
         pdf_url: (downloadLink || ''),
         pdfWidth:null as number|null,
         pdfHeight:null as number|null,
         data: [],
       }
      let getToUserAction: any = []
 
    //<< -- code for external added conponent -->>
    let pdfPages = document.querySelectorAll('.pdf-single-page-outer')
    let canvasPdf = document.querySelectorAll(".pdf-page")
    let totalArray = Array.from(pdfPages)
    
    pdfScrappedData.pdfHeight = canvasPdf[0].children[0].tagName == 'CANVAS'? canvasPdf[0].children[0].getBoundingClientRect().height : canvasPdf[0].children[1].getBoundingClientRect().height
    pdfScrappedData.pdfWidth = canvasPdf[0].children[0].tagName == 'CANVAS'? canvasPdf[0].children[0].getBoundingClientRect().width : canvasPdf[0].children[1].getBoundingClientRect().width


    totalArray.forEach((element) => {

      if((file || {}).fileAction == FileAction.CONFIRM){
        appendDefaultConfirmSign({
           parent: pdfScrappedData,
           subParent: totalArray,
           signaturePath: file.signaturePath,
           elem: element,
           option:'sign'
          })
          appendDefaultConfirmText({
            parent: pdfScrappedData,
            subParent: totalArray,
            text: String(file.text).trim(),
            elem: element,
            option:'text'
           })
      }

      if (element.children.length > 1) {
    //--< formed array from the children element >--
    Array.from(element.children).forEach((item) => {
      if (item.classList.contains('tool-wrapper')) {
 
    // --< START - array from the container containing the added element >--
    Array.from((item.children[1] || item.children[0]).children).forEach((tools: any) => {
       
 
      //--<START- check the element of the tool >--
      switch (tools.tagName) {
        case 'svg':
            appendEditElement({
            parent: pdfScrappedData,
            subParent: totalArray,
            attr: (item as any).getAttribute('style'),
            tools: tools.children[0].getAttribute('d'),
            option: tools.children[0].getAttribute('options'),
            elemScale: (tools as any).getAttribute('elemscale'),
            elem: element,
            type:tools.children[0].getAttribute('type'),
            axisY: [element.getBoundingClientRect().top, item.getBoundingClientRect().top ],
            
            axisX: [element.getBoundingClientRect().left, item.getBoundingClientRect().left],
            length: item.getBoundingClientRect().width,
            svgImagePath:  tools.children[0].getAttribute('svgToImage'),
            svgWidth: tools.getBoundingClientRect().width,
            svgHeight: tools.getBoundingClientRect().height,

            y2: ( tools.children[0].getAttribute('y2') ? tools.children[0].getAttribute('y2') : null),
            x2: ( tools.children[0].getAttribute('x2') ? tools.children[0].getAttribute('x2') : null),
            x1: ( tools.children[0].getAttribute('x') ? tools.children[0].getAttribute('x') : null),
            y1: ( tools.children[0].getAttribute('y') ? tools.children[0].getAttribute('y') : null),
            })
            break;

        case 'BUTTON':
            appendUserActionElement({
            parent: pdfScrappedData,
            subParent: totalArray,
            attr: (item as any).getAttribute('style'),
            option: tools.getAttribute('attr'),
            uploaded:  tools.getAttribute('uploaded'),
            elem: element,
            tool: tools,
            axisY: [element.getBoundingClientRect().top, item.children[0].children[0].children[0].getBoundingClientRect().top ],
            height: item.getBoundingClientRect().height,
            axisX: [element.getBoundingClientRect().left, item.children[0].children[0].children[0].getBoundingClientRect().left],
            axisX2: [item.children[0].children[0].children[0].getBoundingClientRect().left, item.children[0].children[0].children[0].getBoundingClientRect().right],
            axisY2: [item.children[0].children[0].children[0].getBoundingClientRect().top, item.children[0].children[0].children[0].getBoundingClientRect().bottom],
            pdfHeight: pdfScrappedData.pdfHeight,
            pdfWidth: pdfScrappedData.pdfWidth,
            
            x1: ( tools.children[0].getAttribute('x') ? tools.children[0].getAttribute('x') : null),
            y1: ( tools.children[0].getAttribute('y') ? tools.children[0].getAttribute('y') : null),
            type: tools.children[0].getAttribute('type'),
            actionStore: getToUserAction,
            })
          break;
 
          case 'DIV':
              switch (tools.children[0]?.tagName) {
            // case 'INPUT':
            //   appendEditTextInput(
            //     pdfScrappedData,
            //     totalArray,
            //     (item as any).getAttribute('style'),
           //     tools.children[0].value,
           //     element,(tools.children[0] as any).getAttribute('style'),
           //   )
                    // break;
                case 'svg':
                    appendEditElement({
                    parent: pdfScrappedData,
                    subParent: totalArray,
                    attr: (item as any).getAttribute('style'),
                    elemScale: (tools as any).getAttribute('elemscale'),
                    tools: tools.children[0].children[0].getAttribute('d'),
                    option: tools.children[0].children[0].getAttribute('options'),
                    elem: element,
                    axisY: [element.getBoundingClientRect().top, item.getBoundingClientRect().top ],

                    axisX: [element.getBoundingClientRect().left, item.getBoundingClientRect().left],

                    length: ( tools.children[0].children[0].getAttribute('x') ? tools.children[0].children[0].getAttribute('x') : null),
                    y2: ( tools.children[0].children[0].getAttribute('y2') ? tools.children[0].children[0].getAttribute('y2') : null),

                    x1: ( tools.children[0].children[0].getAttribute('x') ? tools.children[0].children[0].getAttribute('x') : null),
                    y1: ( tools.children[0].children[0].getAttribute('y') ? tools.children[0].children[0].getAttribute('y') : null),
                    type: tools.children[0].children[0].getAttribute('type')
                    })
                    break;
                case "P":
                    appendEditText({
                    parent: pdfScrappedData,
                    subParent: totalArray,
                    axisY: [element.getBoundingClientRect().top, item.getBoundingClientRect().top ],

                    axisX: [element.getBoundingClientRect().left, item.getBoundingClientRect().left],
                    attr: (item as any).getAttribute('style'),
                    tools: tools.children[0].textContent,
                    elem: element,
                    fontsize: (tools.children[0] as any).getAttribute('style'),
                    })
                  break; 
                case "IMG":
                    appendEditImage({
                    parent:pdfScrappedData,
                    subParent:totalArray,
                    attr:(item as any).getAttribute('style'),
                    elemScale: (tools as any).getAttribute('elemscale'),
                    tools:tools.children[0].src,
                    scaleDiff:tools.children[0].getAttribute('scaleDiff'),
                    elem:element,
                    axisY: [element.getBoundingClientRect().top, item.getBoundingClientRect().top ],
                    axisY2: [item.getBoundingClientRect().top , item.getBoundingClientRect().bottom ],

                    axisX: [element.getBoundingClientRect().left, item.getBoundingClientRect().left],
                    axisX2: [item.getBoundingClientRect().left , item.getBoundingClientRect().right],
                    width: tools.children[0].getBoundingClientRect().width,
                    height: tools.children[0].getBoundingClientRect().height,
                    })
                  break; 
                }
                
                break;

              default:
                console.log('it is default' + tools.tagName)
                break
                 }
                
 
               })   //--<END - check the element of the tool >--
               
             }  // --< END -  array from the container containig the added element >--
 
           })
         }
       })
 


 //<< -- code for form data component -->>
       let pdfPagesForm = document.querySelectorAll('.pdf-page')
       let totalArrayForm = Array.from(pdfPagesForm)
       totalArrayForm.forEach(element => {
            Array.from(element.children).forEach((anotation)=>{
                  if(anotation.classList.contains('annotationLayer')){
                     // let inputs = document.querySelectorAll(".annotationLayer > input")
                     let inputs = $('.annotationLayer').find(':input');
                     Array.from(inputs).forEach( (elementList: any) => {
                       console.log(elementList.type)
                        switch (elementList.type) {
                           case "text":
                              (pdfScrappedData.data as any).push({
                              type: "PDFTextField",
                              fieldName: elementList.name,
                              value: elementList.value
                              })
                              break;
                           case "checkbox":
                              (pdfScrappedData.data as any).push({
                              type: "PDFCheckBox",
                              fieldName: elementList.name,
                              isCheck:elementList.checked
                              })
                              break;
                           case "select-one":
                              (pdfScrappedData.data as any).push({
                              type: "PDFDropdown",
                              fieldName: elementList.name,
                              value:  elementList.value
                              })
                             break;
                           case "radio":
                              (pdfScrappedData.data as any).push({
                              type: "PDFRadioGroup",
                              fieldName: elementList.name,
                              value :elementList.checked,
                              "checkedIndex":0
                              })
                              break;

                           default:
                              break;
                        }
                     });

                  }
            })
         });

       return [pdfScrappedData, getToUserAction]
   }