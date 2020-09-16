import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import GetCurrentUser from "../../../services/SharePoint/User/GetLoggedInUser";
import GetUserDetails from "./Getlistitemsbychnnelid";
import GetDigest from "../../../services/SharePoint/List/GetDigestValue";
import DeleteItemfromList from "../../../services/SharePoint/List/DeleteItem";
import UpdateListItem from "../../../services/SharePoint/List/UpdateItem";
import GetItembyId from "../../../services/SharePoint/List/GetItemById";
import $ from "jquery";
import CreatePO from "../../../services/SharePoint/List/CreateItem";
import CKEditor from "@ckeditor/ckeditor5-react";
import GetListItembyChannelId from "./Getlistitemsbychnnelid";
// import EditorWatchdog from "@ckeditor/ckeditor5-watchdog/src/editorwatchdog";

// NOTE: Use the editor from source (not a build)!
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
//import UploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
//import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";
import EasyImage from "@ckeditor/ckeditor5-easy-image/src/easyimage";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";
import RealTimeCollaborativeEditing from "@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativeediting";
import RealTimeCollaborativeComments from "@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativecomments";
import PresenceList from "@ckeditor/ckeditor5-real-time-collaboration/src/presencelist";
import RealTimeCollaborativeTrackChanges from "@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativetrackchanges";
import Mention from "@ckeditor/ckeditor5-mention/src/mention";

// var windowLocation = window.location.href;
// var channelIDurl = windowLocation.substr(windowLocation.indexOf("?") + 1);
var channelIDurl = "200826103829";

ClassicEditor.builtinPlugins = [
  Essentials,
  // UploadAdapter,
  // Autoformat,
  Bold,
  Italic,
  BlockQuote,
  CKFinder,
  EasyImage,
  Heading,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  Table,
  TableToolbar,
  TextTransformation,
  RealTimeCollaborativeEditing,
  RealTimeCollaborativeComments,
  RealTimeCollaborativeTrackChanges,
  PresenceList,
  Mention,
];

let MentionPlugin = ClassicEditor.builtinPlugins.find(
  (plugin) => plugin.pluginName === "Mention"
);

function initializePeoplePicker(
  peoplePickerElementId,
  AllowMultipleValues,
  PeopleorGroup,
  GroupID
) {
  // Create a schema to store picker properties, and set the properties.
  var schema = {};
  schema["SearchPrincipalSource"] = 15;
  schema["ResolvePrincipalSource"] = 15;
  schema["MaximumEntitySuggestions"] = 50;
  schema["Width"] = "280px";
  schema["AllowMultipleValues"] = AllowMultipleValues;
  if (PeopleorGroup === "PeopleOnly") schema["PrincipalAccountType"] = "User";
  else schema["PrincipalAccountType"] = "User,DL,SecGroup,SPGroup";
  if (GroupID > 0) {
    schema["SharePointGroupID"] = GroupID;
  }
  // Render and initialize the picker.
  // Pass the ID of the DOM element that contains the picker, an array of initial
  // PickerEntity objects to set the picker value, and a schema that defines
  // picker properties.
  //console.log(this)
  window.SPClientPeoplePicker_InitStandaloneControlWrapper(
    peoplePickerElementId,
    null,
    schema
  );
}
var varItemID;
var CurrentUserDetailsfromListItem;
var updatedData;
class Ckeditorprops extends Component {
  constructor(props) {
    super();
    this.state = {
      CurrentUser: "",
      CurrentUserID: "",
      userDetailsfromList: "",
    };
  }
  componentDidMount() {
    initializePeoplePicker("AddUserPpl", true, "People Only", 44);
    this.GetcurUserDetails();
    this.GetUserDetailsSer();
    this.GetItemsbyIdNo();
  }
  GetItemsbyIdNo = () => {
    GetItembyId("ckeditor", 5).then((r) =>
      this.setState({
        GetItemsbyIdList: r,
        GetItembyIdData: r.results[0].editorContent,
        userDetailsfromListItem: r.results[0].userDetails,
      })
    );
  };
  GetcurUserDetails = () => {
    GetCurrentUser().then((u) =>
      this.setState({ CurrentUserID: u.Id, CurrentUser: u.Title })
    );
  };

  GetUserDetailsSer = () => {
    GetListItembyChannelId("ckeditor", channelIDurl).then((r) =>
      this.setState({
        userDetailsfromList: r,
        itemID: r.results[0].ID,
        userDetailsfromListItem: r.results[0].userDetails,
      })
    );
  };

  // return Promise.resolve(result);

  render() {
    console.log("userDetailsfromList", this.state.userDetailsfromList);
    console.log("GetItemsbyIdList", this.state.GetItemsbyIdList);
    CurrentUserDetailsfromListItem = this.state.userDetailsfromListItem;
    let configDetails =
      "user.id=" +
      this.state.CurrentUserID +
      "&user.name=" +
      this.state.CurrentUser +
      "&role=writer";
    console.log("configDtails", configDetails);
    varItemID = this.state.itemID;
    // const watchdog = new EditorWatchdog(ClassicEditor);
    // configDetails = "";
    let mentionNames = {
      feeds: [
        {
          marker: "@",
          feed: [
            "@Barney",
            "@Lily",
            "@Marshall",
            "@Robin",
            "@Ted",
            "@shivakumar",
          ],
          minimumCharacters: 0,
        },
      ],
    };

    let editorConfiguration = {
      plugins: ClassicEditor.builtinPlugins,
      toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "indent",
        "outdent",
        "|",
        "imageUpload",
        "blockQuote",
        "insertTable",
        "mediaEmbed",
        "undo",
        "redo",
        "|",
        "comment",
        // "trackChanges",
      ],
      cloudServices: {
        // PROVIDE CORRECT VALUES HERE:
        tokenUrl:
          "https://72917.cke-cs.com/token/dev/fdf286ad155ac3fa748a2e0b892f50309d474b2bd1d4419bd84086753a71?" +
          configDetails +
          "",
        uploadUrl: "https://72917.cke-cs.com/easyimage/upload/",
        webSocketUrl: "wss://72917.cke-cs.com/ws",
      },
      collaboration: {
        channelId: channelIDurl,
      },
      sidebar: {
        container: document.querySelector("#sidebar"),
      },
      presenceList: {
        container: document.querySelector("#presence-list-container"),
      },
      comments: {
        editorConfig: {
          extraPlugins: [MentionPlugin],
          mention: mentionNames,
        },
      },
      mention: mentionNames,
    };

    if (this.state.CurrentUser !== "") {
      return (
        <div>
          <div id="adduser" className="row">
            <div id="AddUserPpl"></div>
            <Button
              type="button"
              size="sm"
              variant="primary"
              onClick={this.savetoList}
            >
              Add User
            </Button>

            <Button
              type="button"
              size="sm"
              variant="primary"
              onClick={this.deleteItem}
            >
              Delete Item
            </Button>
          </div>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            data=""
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
              editor.execute("trackChanges");
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </div>
      );
    } else {
      return (
        <div id="adduser" className="row">
          <div id="AddUserPpl"></div>
          <Button
            type="button"
            size="sm"
            variant="primary"
            onClick={this.savetoList}
          >
            Add User
          </Button>
        </div>
      );
    }
  }
  //Delete Item
  deleteItem() {
    alert(varItemID);
    let updateData = {
      Title: "tite ID",
      userDetails: "users",
      editorContent: "body",
    };
    console.log("varitemID", varItemID);
    GetDigest().then((d) =>
      //UpdateListItem("ckeditor", varItemID, d, updateData).then()
      DeleteItemfromList("ckeditor", varItemID, d).then()
    );
    // console.log(
    //   "this.state.userDetailsfromList",
    //   this.state.userDetailsfromList
    // );
  }
  savetoList() {
    let adduser = $("#AddUserPpl_TopSpan .ms-entity-resolved").text();
    //console.log("savetoList", adduser);
    var obj = JSON.parse(CurrentUserDetailsfromListItem);
    obj["users"].push({ id: "23", userName: adduser });
    updatedData = JSON.stringify(obj);
    // console.log(
    //   "CurrentUserDetailsfromListItem",
    //   CurrentUserDetailsfromListItem,
    //   updatedData
    // );

    let commData = {
      Title: channelIDurl,
      userDetails: updatedData,
    };

    GetDigest().then((d) =>
      UpdateListItem("ckeditor", varItemID, d, commData).then()
    );
  }
}

export default Ckeditorprops;
