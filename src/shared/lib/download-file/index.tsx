export const downloadFile = (name: string, contents: any) => {
  // mime_type = mime_type || "text/plain";

  // var blob = new Blob([contents]);

  var dlink = document.createElement("a");
  dlink.target = "_blank";
  dlink.rel = "noopener noreferrer";
  dlink.download = name;
  dlink.href = URL.createObjectURL(contents);
  dlink.onclick = function (e) {
    // revokeObjectURL needs a delay to work properly
    var that = this as any;
    setTimeout(function () {
      URL.revokeObjectURL(that.href);
    }, 1500);
  };

  dlink.click();
  dlink.remove();
};
