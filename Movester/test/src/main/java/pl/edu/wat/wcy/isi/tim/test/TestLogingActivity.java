package pl.edu.wat.wcy.isi.tim.test;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.View;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.concurrent.ExecutionException;

/**
 * Created by Ajron on 2017-06-24.
 */
public class TestLogingActivity extends ActionBarActivity {
    String web = "http://172.23.242.190:3001";

    String jsonString = null;
    JSONObject json = null;

    String text1 = null;
    String text2 = null;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test_loging);
    }

    public void onLogInClick(View view) throws ExecutionException, InterruptedException, JSONException {
        AsyncTask<String, Integer, String> task = new DownloadTokenTask();
        task.execute(web);
        jsonString = task.get();

        json = toJson(jsonString);

        text1 = json.getJSONObject("body").getString("id");
        text2 = json.getJSONObject("body").getString("token");
        DownloadFromUrlTask.id = text1;
        DownloadFromUrlTask.token = text2;

//        TextView textView3 = (TextView) findViewById(R.id.textView3);
//        textView3.setText(text2, TextView.BufferType.EDITABLE);
        Intent i = new Intent(getApplicationContext(), TestAccountManagingActivity.class);
        startActivity(i);
    }

    private JSONObject toJson(String string) {
        JSONObject obj = null;
        try {
            obj = new JSONObject(string);
            Log.d("My App", obj.toString());
        } catch (Throwable t) {}
        return obj;
    }
}
