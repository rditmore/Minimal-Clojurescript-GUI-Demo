(ns hello
  (:require
   [goog.dom :as dom]
   [goog.object :as goog-object]
   [goog.events.Event :as goog-event]
   [goog.events.EventType :as goog-event-type]
   [goog.ui.ColorButton :as color-button]
   [goog.ui.Tab :as gtab]
   [goog.ui.TabBar :as gtabb]))      

;; -------------------------= Debug =-----------------------
(defn debug
  "Output goes to your web browser's console"
  [msg]
  (js/console.log msg))
;;(defn debug [_]) ;; switch to this debug to turn off output

;; -------------------------= State =-----------------------
(def database-connected? (atom false))
(def messaging-connected? (atom false))

;; --------------------------= Widgets =-----------------------------
(def database-button (doto (goog.ui.ColorButton. "Database")
                 (.setTooltip "Database Connection Status")
                 (.setValue "red")))

(def messaging-button (doto (goog.ui.ColorButton. "Messaging")
                        (.setTooltip "Messaging Connection Status")
                        (.setValue "red")))

(def tabbar (goog.ui.TabBar.))

;; -----------------------= Control =---------------------
;; Event handling for the UI
(def events (.getValues goog.object goog.ui.Component/EventType))

(defn handle-tab-select [tabbar e]
  (let [tab (.target e)
        content (.getElement goog.dom (str (. tabbar (getId)) "_content"))]
    (.setTextContent goog.dom content (str "You selected the \"" (. tab (getCaption)) "\" tab"))))

(defn button-color
  "Associate a colour with the states"
  [x]
  (if x "green" "red"))

(defn toggle-state!
  "Simulate trivial connect/disconnect functionality for the buttions"
  [x]
  (swap! x not))

(defn handle-button-push [s e]
  (.setValue (.target e)
             (button-color (toggle-state! s))))

(defn handle-advanced-enable-disable-check-box [e]
  (let [checkbox (.target e)
        advanced-tab (.getChildAt tabbar 3)]
    (debug (str "box is check with " (.checked checkbox)))
    (.setEnabled advanced-tab (.checked checkbox))))

(defn handle-hellow-show-hide-check-box [e]
  (let [checkbox (.target e)
        hello-tab (.getChildAt tabbar 0)]
    (.setVisible hello-tab (.checked checkbox))))

;; ---------------------= MAIN =------------------------
;; Main entry function
(defn ^:export main []
  (debug "Entered into the main function -- should be seen on browser console")

  ;; Populate a DOM via decoration.
  (.decorate tabbar (.getElement goog.dom "top"))

  ;; Populate a DOM via rendering.
  (.render database-button (.getElement goog.dom "buttons"))
  (.render messaging-button (.getElement goog.dom "buttons"))

  ;; Wire up the events
  ;;  The tabbar event
  (.listen goog.events
           tabbar
           goog.ui.Component.EventType/SELECT
           (partial handle-tab-select tabbar))

  ;;  The database button
  (.listen goog.events
           database-button
           goog.ui.Component.EventType/ACTION
           (partial handle-button-push
                    database-connected?))

  ;; The messaging button
  (.listen goog.events
           messaging-button
           goog.ui.Component.EventType/ACTION
           (partial handle-button-push
                    messaging-connected?))

  ;; listener for the checkbox
  ;; could also use (str "enable" (. tabbar (getId))) instead of
  ;; explict `enable_top'
  (.listen goog.events
           (.getElement goog.dom "enable_top") 
           goog-event-type/CLICK
           handle-advanced-enable-disable-check-box)

  (.listen goog.events
           (.getElement goog.dom "show_top")
           goog-event-type/CLICK
           handle-hellow-show-hide-check-box))

