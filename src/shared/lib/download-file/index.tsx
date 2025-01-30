export const downloadFile = (
  name: string,
  contents: string,
  mime_type: string
) => {
  mime_type = mime_type || "text/plain";

  var blob = new Blob([contents], { type: mime_type });

  var dlink = document.createElement("a");
  dlink.target = "_blank";
  dlink.rel = "noopener noreferrer";
  dlink.download = name;
  dlink.href = URL.createObjectURL(blob);
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
