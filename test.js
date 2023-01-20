const str =
  "青の:\n" +
  '{"first": "新世界の未来物語","second": "新世界の未来を行く","third": "新世界の未来を彩る"}';
// const jsonString = str.slice(str.indexOf("{"));
// console.log(jsonString); // "{"key1":"value1","key2":"value2"}"

// // const jsonObj1 = JSON.parse(str);
// // console.log(jsonObj1);

// try {
//   JSON.parse(jsonString);
// } catch (e) {
//   console.error("Invalid JSON format");
// }

// const jsonObj2 = JSON.parse(jsonString);
// console.log(jsonObj2);

const makejson = (str) => {
  const jsonString = str.slice(str.indexOf("{"));

  try {
    const res = JSON.parse(jsonString);
    return res;
  } catch (e) {
    console.error("Invalid JSON format");
  }
};

console.log(makejson(str));
console.log(makejson(str).first);
console.log(makejson(str).second);
// console.log(typeof makejson(str));
