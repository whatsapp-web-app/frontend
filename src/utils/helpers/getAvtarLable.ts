
export function getAvtarLabel(name: string){
  const arr=name.split(" ");
  if(arr.length>1){
    return arr[0].charAt(0)+arr[1].charAt(0);
  }else{
    return arr[0].charAt(0);
  }
}
