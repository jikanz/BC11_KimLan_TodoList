import WorkService from "./../services/service.js";
import Work from "./../model/Work.js";
const service = new WorkService();
const getEle = (id) => document.getElementById(id);
const complete = true;
const renderHTML = (arr) => {
  var contentHTML = "";
  arr.forEach(function (item, index) {
    contentHTML += `
        <li class="text">
        <span id="text2">${item.text}</span>
        <div>
        <button  onclick="capNhat(${item.id})"><i class="far fa-check-circle"></i></button>
            <button onclick="xoa(${item.id})" ><i class="fas fa-trash"> </i></button>
       </div> </li>
        `;
  });
  getEle("todo").innerHTML = contentHTML;
};
const renderHTML2 = (arr) => {
  var contentHTML = "";
  arr.forEach(function (item, index) {
    contentHTML += `
        <li class="text">
        <span>${item.text}</span>
        <div>
        <button  onclick="capNhat(${item.id})"disabled style = "  color: #25b99a;"><i class="far fa-check-circle"></i></button>
            <button onclick="xoa(${item.id})" ><i class="fas fa-trash"> </i></button>
       </div> </li>
        `;
  });
  getEle("completed").innerHTML = contentHTML;
};

const layText = (add) => {
  const text = getEle("newTask").value;
  if (add) {
    if (text === "") {
      alert("Thất bại vui lòng nhập ít nhất 1 thứ gì đó đại loại tui đẹp trai");
      return false;
    } else {
      const complete = false;
      const work = new Work("", text, complete);
      return work;
    }
  }
};
const list = [];
const flechdata = () => {
  service
    .callApi("Work", "GET", null)
    .then((result) => {
      renderHTML(result.data.filter((complete) => complete.complete == false));
      renderHTML2(result.data.filter((complete) => complete.complete == true));
      console.log(...result.data);
      list.push(...result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
flechdata();
console.log(list);
getEle("addItem").addEventListener("click", () => {
  const laytext = layText(true);
  if (!laytext) return;
  service
    .callApi("Work", "Post", laytext)
    .then(() => {
      flechdata();
      alert("add thành công");
    })
    .catch((err) => {
      console.log(err);
    });
});

const xoa = (id) => {
  service
    .callApi(`Work/${id}`, "DELETE", null)
    .then(() => {
      flechdata();
      alert("xóa thành công");
    })
    .catch((err) => {
      console.log(err);
    });
};
window.xoa = xoa;

const capNhat = (id) => {
  const text = document.getElementById("text2")[0];
  const work = new Work(id, text, complete);

  service
    .callApi(`Work/${id}`, "PUT", work)
    .then(() => {
      console.log(work);
      flechdata();
      alert("hoàn thành");
    })
    .catch((err) => {
      console.log(err);
      alert("fail");
    });
};
window.capNhat = capNhat;
// sort() và reverse() thứ tự a-z và z-a
// let fliterAZ = getEle("two");
// fliterAZ.addEventListener("click", () => {
//   list.sort([0]);
// });
getEle("two").addEventListener("click", () => {
  service.callApi("Work", "GET", null).then((result) => {
    let mangTimKiem = [];
    mangTimKiem = result.data.filter((complete) => complete.complete == false);
    renderHTML(mangTimKiem.sort((a, b) => a.text.localeCompare(b.text)));
  });
});
getEle("two").addEventListener("click", () => {
  service.callApi("Work", "GET", null).then((result) => {
    let mangTimKiem = [];
    mangTimKiem = result.data.filter((complete) => complete.complete == false);
    renderHTML(mangTimKiem.sort((a, b) => a.text.localeCompare(b.text)));
  });
});
getEle("three").addEventListener("click", () => {
  service.callApi("Work", "GET", null).then((result) => {
    let mangTimKiem = [];
    mangTimKiem = result.data.filter((complete) => complete.complete == false);
    renderHTML(mangTimKiem.sort((a, b) => b.text.localeCompare(a.text)));
  });
});
