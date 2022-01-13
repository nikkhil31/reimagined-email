import React from "react";
import {
  FaEllipsisV,
  FaLongArrowAltLeft,
  FaReply,
  FaShare,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Detail = ({ setCompose }) => {
  return (
    <main className="my-6 w-full ml-64 mr-6">
      <div className="h-12 flex bg-white shadow rounded-2xl items-center justify-between px-4">
        <Link to="/">
          <FaLongArrowAltLeft className="text-3xl font-semibold" />
        </Link>
        <span className="flex-1 ml-2 font-bold">Wow! Did you see that?</span>
        <div className="w-8 h-8 border border-sky-500 rounded flex items-center justify-center">
          <FaEllipsisV className="text-sky-500" />
        </div>
      </div>

      {/* main area */}
      <div className="mt-3 bg-white rounded-2xl p-9 divide-y">
        {/* Mail area */}

        <div className="pt-3 mb-5">
          <div className="flex justify-between mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-sky-500"></div>
              <div className="ml-3 h-12">
                <h4 className="font-bold h-1/2 text-lg">LinkedIn</h4>
                <span className="text-xs h-1/2 align-top">
                  esperanzalodge@yahoo.com
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="">
                <span className="block text-xs">15 Nov 2020</span>
                <span className="block text-xs text-right">14:45</span>
              </div>
              <div className="w-8 h-8 border border-sky-500 rounded flex items-center justify-center">
                <FaEllipsisV className="text-sky-500" />
              </div>
            </div>
          </div>

          <div className="text-sm">
            Hi Joisse, <br />
            <br />
            Sweet roll chupa chups marshmallow muffin liquorice chupa chups
            soufflé bonbon. Liquorice gummi bears cake donut chocolate lollipop
            gummi bears. Cotton candy cupcake ice cream gummies dessert muffin
            chocolate jelly. Danish brownie chocolate bar lollipop cookie
            tootsie roll candy canes. Jujubes lollipop cheesecake gummi bears
            cheesecake. Cake jujubes soufflé. <br />
            <br /> Cake chocolate bar biscuit sweet roll liquorice jelly
            jujubes. Gingerbread icing macaroon bear claw jelly toffee.
            Chocolate cake marshmallow muffin wafer. Pastry cake tart apple pie
            bear claw sweet. Apple pie macaroon sesame snaps cotton candy jelly
            pudding lollipop caramels marshmallow. Powder halvah dessert ice
            cream. Carrot cake gingerbread chocolate cake tootsie roll. Oat cake
            jujubes jelly-o jelly chupa chups lollipop jelly wafer soufflé.
            <br />
            <br />
            Warm Regards, <br />
            Esperanza
          </div>
        </div>
      </div>

      <div className="mt-8 space-x-3">
        <button
          className="bg-white py-2 px-8 rounded-xl font-semibold"
          onClick={() => setCompose(true)}
        >
          Reply <FaReply className="ml-1 inline-block" />
        </button>
        <button
          className="bg-white py-2 px-8 rounded-xl font-semibold"
          onClick={() => setCompose(true)}
        >
          Forword <FaShare className="ml-1 inline-block" />
        </button>
      </div>
    </main>
  );
};

export default Detail;
