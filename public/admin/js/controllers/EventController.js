angular.module('adminApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log','$window','factory','comm'];

function eventCrtFnt($scope, $log, $window, factory, comm){
       
    
    $scope.currentPresenation=factory.presentationCreation("template_pres","description of the template présentation");
    
   //CREATE an object for interactions with ng-include controller
    $scope.contentMap={};
    $scope.contentMap.payload="";
    
    $scope.presentationMap={};
    $scope.presentationMap.payload="";
    
    comm.loadImages('test','test')
       .then(
            (payload) => { 
                $scope.contentMap.payload = payload;
                $scope.contentMap.array=factory.mapToArray(payload);
            })
        .catch((errorPayload) => $log.error('failure loading movie', errorPayload));
    
    comm.loadPres('test','test')
        .then(
            (payload) => { 
                $scope.presentationMap.payload= payload;
                            
                for(key in $scope.presentationMap.payload){
                    $scope.currentPresenation =$scope.presentationMap.payload[key];
                }
             
          })
        .catch((errorPayload) => $log.error('failure loading movie', errorPayload));
    
    
    $scope.newSlide=function(){
        var slid=factory.slidCreation("slide-Title","slide-text");
        $scope.currentPresenation.slidArray.push(slid);
        
    }
    
    $scope.savePres=function(){
        comm.savePres($scope.currentPresenation);
    }
    
    $scope.selectCurrentSlid=function(slide){
        $scope.currentSlide=slide;
        
    }
    
    
    $scope.onDragComplete=function(data,evt){
       console.log("drag success, data:", data);
    }
    
    
    $scope.onDropComplete=function(data,evt){
        if($scope.currentSlide != undefined){
            $scope.currentSlide.contentMap[1]=data.id;
            //needed to inform angular that a change occurred on the current variable, this fire an event change
             $scope.$apply()
            console.log("drop success, data:", data);
            }
    }
    
    $scope.getCurrentContent=function(){
        if(1  in  $scope.currentSlide.contentMap){
            return $scope.currentSlide.contentMap[1];
        }
    }
    
    $scope.isSlidContentEmpty=function(slid){
        if(slid.contentMap[1]== undefined){
            return true;
        }
        return false
    }    
            
    
    
};
