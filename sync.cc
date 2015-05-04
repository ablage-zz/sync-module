#include <string>
#include <cstdlib>
#include <node.h>
#include <nan.h>

using namespace v8;

NAN_METHOD(syncRun) {
	NanScope();

	if (args.Length() < 1) {
		NanThrowTypeError("Wrong number of arguments.");
		NanReturnUndefined();
	}

	if (!args[0]->IsString()) {
		NanThrowTypeError("Argument should be a string.");
		NanReturnUndefined();
	}

	const String::Utf8Value utf8Command(args[0]);
	const std::string command = "{ " + std::string(*utf8Command) + "; } 2>&1";

	FILE *fp = popen(command.c_str(), "r");
	if (fp == NULL) {
		NanThrowTypeError("Failed to open file.");
		NanReturnUndefined();
	}

	const int BUF_SIZE = 4048;
	char buf[BUF_SIZE];
	std::string result;

	while (fgets(buf, BUF_SIZE, fp) != NULL) {
		result += buf;
	}

	pclose(fp);

	NanReturnValue(String::New(result.c_str()));
}

void init(Handle<Object> exports, Handle<Object> module) {
  NODE_SET_METHOD(module, "exports", syncRun);
}

NODE_MODULE(sync, init)
