function shiftLeft() {
    const boxes = document.querySelectorAll(".box");
    const tmpNode = boxes[0];
    boxes[0].className = "box move-out-from-left";
    
    setTimeout(function() {
        if (boxes.length > 2) {
            tmpNode.classList.add("box");
            tmpNode.classList.add("move-to-position3-from-left");
        }
        boxes[1].className = "box move-to-position1-from-left";
        boxes[2].className = "box move-to-position2-from-left";
        boxes[0].remove();
    
        document.querySelector(".cards__container").appendChild(tmpNode);
    
    }, 500);
    
    }
    
    function shiftRight() {
    const boxes = document.querySelectorAll(".box");
    boxes[2].className = "box move-out-from-right ";
    setTimeout(function() {
        const noOfCards = boxes.length;
        if (noOfCards > 1) {
            boxes[2].className = "box box--hide";
        }
        const tmpNode = boxes[noOfCards - 1];
        boxes[noOfCards - 1].remove();
        let parentObj = document.querySelector(".cards__container");
        parentObj.insertBefore(tmpNode, parentObj.firstChild);
        tmpNode.className = "box move-to-position1-from-right";
        boxes[0].className = "box move-to-position2-from-right";
        boxes[1].className = "box move-to-position3-from-right";
    }, 500);
    
    }