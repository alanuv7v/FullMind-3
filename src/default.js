export const default_thot = {
  id: 0, 
  authName: "D", // false or string
  props: {
    /* heading: {type: "String", textAlign: "center"}, */
    content: "",
   /*age: {type: "Int"}, */
  },
  relations: [
    {parents: [],
      children: []},
    {conclusions: [],
      reasons: []},
    {poem: [],
      actuality: []}
  ],
  metadata: {
    "Created date": null,
    "Modified date": null,
    History: null,
  },
  customMetadata: {},
};
/* uuid 사용해서 id 부여 고려 */

export const default_thot_customMetadata = {
  Done: { icon: "checkbox", visual: [] },
  "Logically sound": { icon: "checkbox", visual: [] },
  Important: { icon: "!", visual: ["hilight"] },
};

export const default_container_data = {
  index: [],
  thot: default_thot,
};

const default_thot2 = {
  heading: "",
  content: "",
  relations: {
    "Conclusions - Reasons": {
      conclusions: [], //"parents"
      reasons: [], //"children"
    },
  },
};

/* function isInstanceOfTemplateCheck(target, template) {
  let beenTrue = true;
  for (key of template.keys) {
    //check if the target has all keys of the template, and the target's value's type is same as the template's.
    if (
      target.keys.includes(key) &&
      typeof target[key] === typeof template[key]
    ) {
      //JSON.stryingfy를 통해 비교하면 더 좋을텐데... 그러나 타입 검사를 못한다면...
    } else {
      beenTrue = false;
    }
  }
} */
