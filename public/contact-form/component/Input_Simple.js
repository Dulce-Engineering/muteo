import Utils from "./Utils.js";

class Input_Simple extends HTMLElement
{
  static tname = "input-simple";

  constructor()
  {
    super();
    this.item_value = null;
    Utils.Bind(this, "On_");
  }

  connectedCallback()
  {
    this.Render();
  }

  // public fields ================================================================================

  get value()
  {
    return this?.box_input?.value;
  }

  set value(v)
  {
    this.item_value = v;
    if (this.isConnected)
    {
      this.Render_Value();
    }
  }

  // public methods ===============================================================================

  Has_Value()
  {
    return !Utils.isEmpty(this.value);
  }

  // events =======================================================================================

  On_Blur(event)
  {
    if (this.Has_Value())
    {
      this.classList.add("has-data");
    }
    else
    {
      this.classList.remove("has-data");
    }
  }

  // rendering ====================================================================================

  Render_Value()
  {
    this.box_input.value = this.item_value || "";
    this.On_Blur();
  }

  Render_Input()
  {
    const input_type = this.getAttribute("input-type") || "text";
    const required_attr = this.hasAttribute("is-required") ? "required" : "";
    const name = this.hasAttribute("has-name") ? `name="${this.getAttribute("has-name")}"` : "";

    let value_attr = "";
    if (this.hasAttribute("value"))
    {
      const value = this.getAttribute("value");
      value_attr = `value="${value}"`;
    }

    const html = `<input cid="box_input" type="${input_type}" ${value_attr} ${required_attr} ${name} />`;

    return html;
  }

  Render()
  {
    const html = `
      <label cid="box_label"></label>
      ${this.Render_Input()}
    `;

    const doc = Utils.toDocument(html); // parse html into dom elements
    this.replaceChildren(doc); // insert elements into this component
    Utils.Set_Id_Shortcuts(this, this, "cid"); // create shortcust to elements by id

    if (this.hasAttribute("label-text"))
    {
      this.box_label.innerText = this.getAttribute("label-text");
    }

    this.box_input.addEventListener("blur", this.On_Blur);

    this.Render_Value();
  }
}

Utils.Register_Element(Input_Simple);

export default Input_Simple;
