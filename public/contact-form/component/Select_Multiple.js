import Utils from "./Utils.js";

class Select_Multiple extends HTMLElement
{
  static tname = "select-multiple";
    
  constructor()
  {
    super();
    Utils.Bind(this, "On_");
  }

  connectedCallback()
  {
    this.Render();
  }

  // public fields ================================================================================

  get value()
  {
    let res = null;

    const items = this.querySelectorAll("check-simple");
    if (!Utils.isEmpty(items))
    {
      res = [];
      for (const item of items)
      {
        if (item.checked)
        {
          res.push(item.value);
        }
      }
    }

    return res;
  }

  // events =======================================================================================

  On_Click_Header()
  {
    if (this.classList.contains("open"))
    {
      this.classList.remove("open");
    }
    else
    {
      this.classList.add("open");
    }
  }

  // rendering ====================================================================================

  Render_Header()
  {
    const label_attr = Utils.Get_Attr_Def(this, "label-text", "Please choose");

    const html = `<div cid="header_elem">${label_attr}</div>`;
    return html;
  }

  Render_Items()
  {
    let html = "";

    const item_elems = this.querySelectorAll("option");
    if (!Utils.isEmpty(item_elems))
    {
      for (const item_elem of item_elems)
      {
        const value = item_elem.value;
        const label = item_elem.innerText;
        const item_html = `<check-simple value="${value}"><span slot="label">${label}</span></check-simple>`;
        html += item_html;
      }
      html = `<div class="items">${html}</div>`;
    }

    return html;
  }

  Render()
  {
    const html = `
      ${this.Render_Header()}
      ${this.Render_Items()}
    `;

    const doc = Utils.toDocument(html, this);
    this.replaceChildren(doc);
    Utils.Set_Id_Shortcuts(this, this, "cid");

    this.header_elem.addEventListener("click", this.On_Click_Header);

    this.hidden = false;
  }
}

Utils.Register_Element(Select_Multiple);

export default Select_Multiple;
